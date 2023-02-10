const fs = require('fs')
const path = require('path')

/**
 * 
 * @param {*} empire_path 
 * @param {*} millenium_path default
 * @returns a boolean to state if files are okay or not
 */
const checkFiles = (empire_path, millenium_path='./data/millenium-falcon.json') => {
    let ext_b = true
    let exists_b = true
    let format_b = true
    
    // Check files extension
    if(((path.parse(millenium_path).ext) !== '.json') || ((path.parse(empire_path).ext) !== '.json')) {
        console.log("Files provided must be JSON file, please provide other files\n\tExiting...")
        ext_b = false
        return false
    }

    // Check if files exists
    if(!fs.existsSync(millenium_path) || !fs.existsSync(empire_path)){
        console.log("Unable to locate files provided, please provide valid paths to files")
        exists_b = false
        return false
    }

    // Check file format
    const millenium = require(`../${millenium_path}`)
    const empire = require(`../${empire_path}`)

    // Check millenium file format
    if(!millenium.autonomy || !millenium.departure || !millenium.arrival || !millenium.routes_db) {
        console.log(`\n\tThe file <${path.parse(millenium_path).name}> you provided doesn't respect the expected format,\n\tPlease provide a properly formatted file`)
        format_b = false
        return false
    }
    // Check empire file format
    if(!empire.countdown || 
        !empire.bounty_hunters ||
        !empire.bounty_hunters.map(bounty => {
            if(!bounty.planet || !bounty.day) {
                format_b = false
                console.log(`\n\tThe file <${path.parse(empire_path).name}> you provided doesn't respect the expected format,\n\tPlease provide a properly formatted file`)
                return false
            }
            })
    ) {
        format_b = false
        console.log(`\n\tThe file <${path.parse(empire_path).name}> you provided doesn't respect the expected format,\n\tPlease provide a properly formatted file`)

        return false
    }

    return ext_b && exists_b && format_b
}

module.exports = checkFiles