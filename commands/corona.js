const Discord = require('discord.js')
const axios = require('axios')
const moment = require('moment')
const strTmp = require('string-template')
const lodash = require('lodash')
const warna = 'RANDOM'
const botS = require('../botsettings.json')
const prefix = botS.prefix
module.exports.run = async (bot, message, args) => {
  // Setting
  const argv = require('yargs-parser')(args)
  const url = 'https://covid19.mathdro.id/api'
  const embed = new Discord.MessageEmbed()
      .setFooter("Betty" , message.guild.iconURL)
      .setTimestamp()
  const ifError = false
  let errorMsg = ''
  // console.log(argv)
  
  if (args.length === 0) {
    embed
      .setAuthor('Pantau COVID-19 di sini!', '', 'https://github.com/mathdroid/covid-19-api')
      .setDescription(`**Kalian bisa menemukan informasi tentang COVID-19 lebih lengkapnya di sini.\n\nCara Penggunaan:\n\`${prefix}corona [negara]\` \n[--kasus|--sehat|--tewas|--negara]\n\nContoh:\n\`${prefix}corona ID\`\n\`${prefix}corona --kasus\`\n\`${prefix}corona --s\`**`)
      .setImage('https://covid19.mathdro.id/api/og')
      .setColor(warna)
  }
  function numeralFormat (number) {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  /**
   * Mengubah data menjadi string yang cantik.
   * @param {any[]} data 
   * @param {'recover' | 'confirm' | 'death'} mode
   */
  function parsingCovidData (data, mode) {
    const ret = []
    let point = 1
    data.forEach(da => {
      let str = `**${point}.** `
      let dataInput = ''
      switch (mode) {
        case 'confirm':
          dataInput = `Kasus: ${numeralFormat(da.confirmed)} orang.`
          break
        case 'recover':
          dataInput = `Sembuh: ${numeralFormat(da.recovered)} orang (${da.recoveredPercentage.toFixed(2)}%)`
          break
        case 'death':
          dataInput = `Tewas: ${numeralFormat(da.deaths)} orang (${da.deathsPercentage.toFixed(2)}%)`
          break
      }
      str += strTmp(
        '**[{code}] {province}{country}**. {input} ({issUpdate})',
        {
          code: `${da.iso2}|${da.iso3}`,
          province: da.provinceState === null ? '' : `${da.provinceState}, `,
          country: da.countryRegion === null ? '' : da.countryRegion,
          input: dataInput,
          issUpdate: moment(da.lastUpdate).utcOffset(8).locale('id').format('dddd, DD-MM-YYYY HH:mm:ss')
        }
      )
      ret.push(str)
      point++
    })
    return ret.join('\n')
  }

  function detailToEmbed (data) {
    const province = data.provinceState !== null ? `${data.provinceState}, ` : ''
    embed
      .setAuthor(`[${data.iso3}] ${province}${data.countryRegion} (${data.lat}, ${data.long})`, '', 'https://github.com/mathdroid/covid-19-api')
      .setDescription(`Terakhir diperbaharui pada ${moment(data.lastUpdate).utcOffset(8).locale('id').format('dddd, DD-MM-YYYY HH:mm:ss')}.`)
      .addField('Kasus Dikonfirmasi: ', `${numeralFormat(data.confirmed)} orang`, true)
      .addField('Sembuh: ', `${numeralFormat(data.recovered)} orang (${parseInt((data.recovered / data.confirmed) * 100)}%)`, true)
      .addField('Hidup: ', `${numeralFormat(data.active)} orang (${parseInt((data.active / data.confirmed) * 100)}%)`, true)
      .addField('Tewas: ', `${numeralFormat(data.deaths)} orang (${parseInt((data.deaths / data.confirmed) * 100)}%)`, true)
      .setColor(warna)
  }

  async function awaitResponsesNegara (data) {
    const _data = lodash(data)
    const province = _data.map('provinceState').value()
    const msgProvince = await message.channel.send(province.join(', '))
    const msgBeforeSearch = await message.channel.send('Di antara provinsi tersebut, yang mana ingin anda ketahui secara detail informasinya? (Symbol Sensitive)')
    await message.channel.awaitMessages(
      m => m.author.id === message.author.id,
      { max: 1, time: 300000, errors: ['time'] }
    )
      .then(async collected => {
        await msgProvince.delete()
        await msgBeforeSearch.delete()

        const _province = collected.first().content
        const realDataOutput = _data.filter(da => {
          return da.provinceState.toLowerCase() === _province.toLowerCase()
        }).value()

        if (realDataOutput.length === 0) {
          embed.setDescription(`Tidak ada nama **${_province}** yang ditemukan.`)
        } else {
          detailToEmbed(realDataOutput[0])
        }
      })
      .catch(err => {
        embed.setDescription('Waktu habis, silahkan request ulang.')
      })
  }

  // Berdasarkan negara
  if (argv._.length === 1) {
    const region = argv._[0].toUpperCase()
    await axios.get(`${url}/countries/${region}/confirmed`)
      .then(async _data => {
        const data = _data.data
        if (data.length === 0) {
          embed.setDescription(`Tidak ada negara dengan kode **${region}**, silahkan mengecek kode negara yang tersedia di bawah ini:\nhttps://en.wikipedia.org/wiki/ISO_3166-1_alpha-3`)
        } else {
          // Apabila gaada negara gitu
          if (data.length === 1) {
            detailToEmbed(data[0])
          }
          // Ini sudah ada negaranya
          else {
            await awaitResponsesNegara(data)
          }
        }
      })
      .catch(err => {
        ifError = true
        errorMsg = `Terjadi gagal permintaan kepada server dengan error: ${err.message}. Hubungi developer secepatnya!`
      })
  }

  // Cek negara
  if (typeof argv.negara === 'boolean' || typeof argv.n === 'boolean') {
    embed.setDescription(`Silahkan mengecek kode negara yang tersedia di bawah ini:\nhttps://en.wikipedia.org/wiki/ISO_3166-1_alpha-3`)
    .setColor(warna)
  }

  // Untuk Confirmed/Kasus
  if (typeof argv.kasus === 'boolean' || typeof argv.k === 'boolean') {
    embed.setAuthor('Top 10 Negara dengan Kasus Terbanyak', '', 'https://github.com/mathdroid/covid-19-api')
      await axios.get(`${url}/confirmed`)
      .then(data => {
        // Urut berdasarkan kasus terbanyak dan dipotong dari 0 sepanjang 10 data
        const _data = parsingCovidData(
          lodash(data.data)
            .orderBy('confirmed', 'desc')
            .slice(0, 10)
            .value(),
          'confirm'
        )
        embed
        .setDescription(`Selengkapnya cek di \`${prefix}corona [negara]\`\n\n` + _data)
        .setColor(warna)
      })
      .catch(err => {
        ifError = true
        errorMsg = `Terjadi gagal permintaan kepada server dengan error: ${err.message}. Hubungi developer secepatnya!`
      })
  }

  // Untuk Sehat
  if (typeof argv.sehat === 'boolean' || typeof argv.s === 'boolean') {
    embed.setAuthor('Top 10 Negara dengan Persentase Sehat Terbanyak', '', 'https://github.com/mathdroid/covid-19-api')
      await axios.get(`${url}/recovered`)
      .then(data => {
        // Urut berdasarkan persentase sehat terbanyak dan dipotong dari 0 sepanjang 10 data
        const _data = parsingCovidData(
          lodash(data.data)
            .map(da => {
              let nDa = da
              nDa.recoveredPercentage = (nDa.recovered / nDa.confirmed) * 100
              return nDa
            })
            .orderBy('recoveredPercentage', 'desc')
            .slice(0, 10)
            .value(),
          'recover'
        )
        embed.setDescription(`Selengkapnya cek di \`${prefix}corona [negara]\`\n\n` + _data)
        .setColor(warna)
      })
      .catch(err => {
        ifError = true
        errorMsg = `Terjadi gagal permintaan kepada server dengan error: ${err.message}. Hubungi developer secepatnya!`
      })
  }

  // Untuk Mati
  if (typeof argv.tewas === 'boolean' || typeof argv.t === 'boolean') {
    embed.setAuthor('Top 10 Negara dengan Persentase Tewas Terbanyak', '', 'https://github.com/mathdroid/covid-19-api')
      await axios.get(`${url}/deaths`)
      .then(data => {
        // Urut berdasarkan persentase sehat terbanyak dan dipotong dari 0 sepanjang 10 data
        const _data = parsingCovidData(
          require('lodash')(data.data)
            .map(da => {
              let nDa = da
              nDa.deathsPercentage = (nDa.deaths / nDa.confirmed) * 100
              return nDa
            })
            .orderBy('deathsPercentage', 'desc')
            .slice(0, 10)
            .value(),
          'death'
        )
        embed.setDescription(`Selengkapnya cek di \`${prefix}corona [negara]\`\n\n` + _data)
      })
      .catch(err => {
        ifError = true
        errorMsg = `Terjadi gagal permintaan kepada server dengan error: ${err.message}. Hubungi developer secepatnya!`
      })
  }

  // Kirim data
  ifError
    ? message.reply(`Sayangnya, error terjadi dengan pesan:\`\`\`${errorMsg}\`\`\``)
    : message.channel.send(`<@!${message.author.id}>`, { embed: embed })
}

module.exports.help = {
    name : "corona"
}