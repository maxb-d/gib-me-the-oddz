

const checkFiles = (empire) => {
    let formatb = true
    
    // Check empire file format
    if(!empire.bounty_hunters.map(bounty => {
        if(!bounty.planet || !bounty.day) {
            formatb = false
        }
        }))
    if(!empire.countdown || 
        !empire.bounty_hunters ||
        !empire.bounty_hunters.map(bounty => {
            if(!bounty.planet || !bounty.day) {
                formatb = false
                console.log(`\n\tThe file <${path.parse(empire_path).name}> you provided doesn't respect the expected format,\n\tPlease provide a properly formatted file`)
                return false
            }
            })
    ) {
        formatb = false
        console.log(`\n\tThe file <${path.parse(empire_path).name}> you provided doesn't respect the expected format,\n\tPlease provide a properly formatted file`)

        return false
    }
    return formatb
}

module.exports = checkFiles