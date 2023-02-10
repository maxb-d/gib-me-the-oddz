/**
 * 
 * @param {*} valid_paths 
 * @param {*} bounty_hunter 
 * @returns valid path with the added probability of getting caught 
 *          by bounty hunters for each path
 */
function evaluateOdds(valid_paths, bounty_hunter) {
    valid_paths.forEach(path => {
        let k = 0
        path.map(object => {
            if(bounty_hunter.find(bounty => bounty.planet === object.name && bounty.day === object.day))
                k += 1
        })

        path.proba = 0
        for (let i = k; i > 0; i--) {
            path.proba += (9 ** (i - 1)) / (10 ** (i))
        }
        path.proba = (1 - path.proba) * 100       
    })
    
    return valid_paths
}

module.exports = evaluateOdds