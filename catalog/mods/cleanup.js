var ConfigIniParser = require("C:\\Users\\Jendos\\AppData\\Roaming\\npm\\node_modules\\config-ini-parser").ConfigIniParser;
var delimiter = "\n"; //or "\n" for *nux
const fs = require('fs');
var count = 0
var path = require('path')
var db = require("E:\\WebDev\\BBCatalogue\\vite-project\\src\\db.json")

var getName = function(dir) {
    var results = [];
    var list = fs.readdirSync(dir);
	var k
	var input
	var f
	var sql = []
	var data
	var toggle = true
    list.forEach(function(file) {
		toggle = true
		//console.log(file)
		k = file;
        input = dir + '/' + file;
        var stat = fs.statSync(input);
        if (stat && stat.isDirectory()) { 
			j = file;
			results = results.concat(getName(input));
        } else if (k === 'chart.cfg') {
			//console.log("UPDATE mods SET meta_name = " + j + " WHERE name = \"" + j + "\";")
			data = fs.readFileSync(input, 'utf8');
			//console.log("INSERT INTO mods (name) VALUES(\""+j+"\");") // get every mod and add it
			data = data.toString().split("\n");
			var match = data[data.findIndex(v => v.includes("animation"))].match(/[^"]*.png/gmi)
			if (match !== null) {
				match = path.parse(match.toString()).name
			}
			//console.log("name "+ j +" " + match)
			console.log("UPDATE mods SET preview_imgs = \"" + match + "\" WHERE name = \"" + j + "\";")
			//console.log("UPDATE mods SET mod_title = \"" + j + "\" WHERE name = \"" + j + "\";")
			//console.log("UPDATE mods SET thumb_img = \"" + k + "\" WHERE name = \"" + j + "\";")
		} 
    });
}
	

var getMeta = function(dir) {
    var results = [];
    var list = fs.readdirSync(dir);
	var k
	var input
	var f
	var sql = []
	var data
	var toggle = true
	list.forEach(function(file) {
			toggle = true
			//console.log(file)
			k = file;
			input = dir + '/' + file;
			var stat = fs.statSync(input);
			if (stat && stat.isDirectory()) { 
				j = file;
				console.log("UPDATE mods SET folder = \"" + j + "\" WHERE name = \"" + j + "\";")
				results = results.concat(getMeta(input));
			} else if (k === 'meta.cfg') { 
				data = fs.readFileSync(input, 'utf8');
				parser = new ConfigIniParser(delimiter);
				parser.parse(data);
				var value = parser.get("META", "mod_title");
				console.log("UPDATE mods SET mod_title = " + value + " WHERE name = \"" + j + "\";") //update
				value = parser.get("META", "mod_creator");
				console.log("UPDATE mods SET mod_creator = " + value + " WHERE name = \"" + j + "\";") //update
				value = parser.get("META", "mod_artist");
				console.log("UPDATE mods SET mod_artist = " + value + " WHERE name = \"" + j + "\";") //update 
				value = parser.get("META", "song_artist");
				console.log("UPDATE mods SET song_artist = " + value + " WHERE name = \"" + j + "\";") //update
				value = parser.get("META", "song_title");
				console.log("UPDATE mods SET song_title = " + value + " WHERE name = \"" + j + "\";") //update
				value = parser.get("META", "length");
				console.log("UPDATE mods SET length = " + value + " WHERE name = \"" + j + "\";") //update 

				//console.log(value)	
				//parser.stringify('\n'); //get all the ini file content as a string
				
				//console.log("UPDATE mods SET preview_imgs = \'" + match + "\' WHERE name = \"" + j + "\";")
				//console.log("UPDATE mods SET preview_imgs = \'" + match + "\' WHERE name = \"" + j + "\";")
				count = count + 1

				//toggle = false
			}
		});
}
	//console.log(sql)
    //return sql;

function clearFiles(dir){
	var input
	var list = fs.readdirSync(dir);
	db.forEach(e => {
		//console.log(e.folder, e.preview_imgs + ".png")
		input = dir + '\\' + e.folder + '\\' + 'anims';
		var stat = fs.statSync(input)	
		readFolder(input, stat, e)
	});
}


function readFolder(ref, st, d){
	//console.log(ref)
	fs.readdir(ref, (err, files) => {
		  files.forEach(file => {
			if (st && st.isDirectory()){
				if(!(file === (d.preview_imgs + ".png"))){
					//console.log(ref + "\\" + d.folder + "\\" + file);
					var r = ref + "\\" + file
					fs.unlink(r, (err => {
					  if (err) console.log(err);
					  else {
						console.log("\nDeleted file: example_file.txt");
					  }
					}));
				}
				else{
					console.log("Found!", file)
				}
			}
		  });
	});
}


clearFiles("E:\\WebDev\\BBCatalogue\\mods\\dist\\#discord")

//getName("E:\\WebDev\\BBCatalogue\\mods\\#discord")
//getMeta("E:\\WebDev\\BBCatalogue\\mods\\#discord")
