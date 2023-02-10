const asyncHandler = require('express-async-handler')

const db = require('../config/dbConn')

const evaluateOdds = require('../services/evaluateOdds')
const buildAdjencyMatrix = require('../utils/adjacencyComputer')

const millenium_falcon = require('../config/millennium-falcon.json')
const checkFiles = require('../utils/checkFiles')

/**
 * @desc Require odds processing
 * @route POST /compute
 * @access Private
 */
const getOdds = asyncHandler(async (req, res) => {
    
    // Parse the data from the client
    const empire = req.body
    if(!checkFiles(empire)) {
        res.status(400)
        res.json('unvalid')
        return
    }
    
    // Query the db
    let sql = `SELECT * FROM 'routes'`
    let dbRoutes = []
    
    function DataExt(db, callback) {
        db.all(sql, [], (err, rows) => {
            // Retrieve the routes from DB
            if (err) {
                res.status(400).json({ "error": err.message})
            } else {
                    rows.forEach((row) => {
                        dbRoutes.push(row)
                        res.status(200)
                    })

                    return callback(false, dbRoutes)
                }
            });
    }

    DataExt(db, function(err, content) {
        if(err) throw(err)
        ExtractedRoutes = content

        // Build adjacency matrix from the routes
        const adjacencyMatrix = buildAdjencyMatrix(ExtractedRoutes)
        
        // Map viable routes from the graph
        let paths = []
        function dfs(adjencyMatrix, path, node_name, arrival, total_travelled_time, autonomy, countdown) {
            // if countdown < 0
            if (total_travelled_time > countdown) {
                return
            }
        
            // check if won
            if (node_name === arrival && total_travelled_time <= countdown) {
                path.push({ name: node_name, day: total_travelled_time })
                paths.push(path)
                return 
            }
        
            // Out of fuel
            if (autonomy === 0) {
                // verify countdown
                path.push({ name: node_name, day: total_travelled_time })
        
                // Stay One day & refill tank
                autonomy = 6
                total_travelled_time += 1
            }
        
            // for each neighbour
            let current_obj = adjencyMatrix.find((elem) => elem.name === node_name)
        
            current_obj.routes.forEach(neighbour => {
                // Compute new variable for after the Hyperspace jump
                let new_total_travelled_time = total_travelled_time + neighbour.travelTime
         
                // Check if autonomy is not negative
                let new_autonomy
                if(node_name === neighbour.name) { // Does not travel
                    new_autonomy = 6
                }
                else{
                    // Check if new autonomy is negative
                    if (autonomy - neighbour.travelTime < 0) { return }
                    new_autonomy = autonomy - neighbour.travelTime;
                }
        
                // try every neighbour
                dfs(
                    adjencyMatrix, 
                    // Update path with the current step
                    [...path, { name: node_name, day: total_travelled_time }],
                    neighbour.name,
                    arrival,
                    new_total_travelled_time,
                    new_autonomy,
                    countdown
                );
            });
        }
        
        let resDefault = { route: {name: 'default', day: 0}, proba: 0 }
        if(empire.countdown > 27) {
            resDefault.proba = 100
            res.json(resDefault)
        }
        
        dfs(adjacencyMatrix, [], millenium_falcon.departure, millenium_falcon.arrival, 0, millenium_falcon.autonomy, empire.countdown)
        
        // Assign probability to get caught to each viable route and select the best one
        const valid_path_with_odds = evaluateOdds(paths, empire.bounty_hunters)
        let bestOdds = 0
        let resObject
        valid_path_with_odds.map(path => {
            if(path.proba > bestOdds){
                 bestOdds = path.proba
                 resObject = {route: [path], proba: path.proba}
            }
        })
        if(!resObject) {
            res.json(resDefault)
        } else {
            res.json(resObject)
        }
    })
    });

module.exports = {getOdds}

