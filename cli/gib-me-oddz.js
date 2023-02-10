const inquirer = require("inquirer");

const evaluateOdds = require('./utils/evaluateOdds')
const buildAdjencyMatrix = require('./utils/adjacencyComputer')

const sqlite3 = require('sqlite3');
const pathOs = require('path');
const checkFiles = require("./utils/checkFiles");

async function call_inquirers() {
    console.log("   8888888888  888    88888                               \n  88     88   88 88   88  88                              \n   8888  88  88   88  88888                               \n      88 88 888888888 88   88           888888 88       88\n8888888  88 88     88 88     888888    88      88       88\n                                      88       88       88\n88  88  88   888    88888    888888   88       88       88\n88  88  88  88 88   88  88  88         88      88       88\n88 8888 88 88   88  88888    8888       888888 88888888 88\n 888  888 888888888 88   88     88                        \n   88  88  88     88 88    8888888                         \n\n Please type the path to the two files needed for execution")
    const inq1 = await inquirer_menu()
}
    
async function inquirer_menu() {
  inquirer
    .prompt([
      {
        name: "millenium",
        message: "Enter the path for the millenium falcon data set",

        default: "millenium-falcon.json"
      },
      {
        name: "empire",
        message: "Enter the path for the empire data intercepted by the rebels",

        default: "empire.json"
      }
    ])
    .then((answers) => { 

        // Retrieving paths from the prompt
        const millenium_falcon_path = answers.millenium
        const empire_path = answers.empire

        // Checking files validity
        if(!checkFiles(empire_path, millenium_falcon_path)){
            return
        }

        // Requiring file content
        const millenium_falcon = require(millenium_falcon_path)
        const empire = require(empire_path)
        
        // Getting data from the db
        const db_name = pathOs.join(__dirname, "data", "universe.db");
        const db = new sqlite3.Database(db_name, err => {
        if (err) {
            return console.error(err.message);
        }

        let sql = `SELECT * FROM 'routes'`
        let db_routes = []
        
        function DataExt(db, callback) {
            db.all(sql, [], (err, rows) => {
                // Retrieve the routes from DB
                if (err) {
                    console.error(err)
                } else {
                        rows.forEach((row) => {
                            db_routes.push(row)
                        })

                        return callback(false, db_routes)
                    }
                });
        }

        DataExt(db, function(err, content) {
            if(err) throw(err)
            extracted_routes = content
    
            // Build adjacency matrix from the routes
            const adjacency_matrix = buildAdjencyMatrix(extracted_routes)
            
            // Map viable routes from the graph
            let paths = []
            function dfs(graph, path, node_name, arrival, total_travelled_time, autonomy, countdown) {
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
                let current_obj = graph.find((elem) => elem.name === node_name)
            
                current_obj.routes.forEach(neighbour => {
                    // Compute new variable for after the Hyperspace jump
                    let new_total_travelled_time = total_travelled_time + neighbour.travel_time
             
                    // Check if autonomy is not negative
                    let new_autonomy
                    if(node_name === neighbour.name) { // Does not travel - Need to refresh autonomy here
                        new_autonomy = 6
                    }
                    else{
                        // Check if new autonomy is negative
                        if (autonomy - neighbour.travel_time < 0) { return }
                        new_autonomy = autonomy - neighbour.travel_time;
                    }
            
                    // try every neighbour (recursive call)
                    dfs(
                        graph, 
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
            
            dfs(adjacency_matrix, [], millenium_falcon.departure, millenium_falcon.arrival, 0, millenium_falcon.autonomy, empire.countdown)

            // Assign probability to get caught to each viable route and select the best one
            const valid_path_with_odds = evaluateOdds(paths, empire.bounty_hunters)
            let best_odds = 0
            valid_path_with_odds.map(path => {
                if(path.proba > best_odds) best_odds = path.proba
            })
        });
    });
})}

call_inquirers()
    
