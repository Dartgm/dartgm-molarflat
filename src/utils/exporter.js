const fs = require('fs')
const path = require('path')
let rootPath
async function isFoldExits(currentPath,exportDir){
    const absPath = path.resolve(currentPath,exportDir)
    try {
        await fs.promises.stat(absPath)
    }catch(e){
        await fs.promises.mkdir(absPath,{recursive:true})
    }
}
function exportFileToDir(filePath,exportDir){
    isFoldExits(filePath,exportDir)
    rootPath = filePath
    function displayFileToDir(filepath,exportDir){
        fs.readdir(filepath,function(err,files){
            files.forEach((filename)=>{
                const fileDir = path.join(filepath,filename)
                fs.stat(fileDir,function(err,stats){
                    const isFile = stats.isFile()
                    const isDir = stats.isDirectory()
                    if(isFile){
                        let destPath = rootPath+`/${exportDir}/`+filename
                        fs.rename(fileDir,destPath,function(err){
                            if(err){console.log(err)}
                        })
                    }
                    if(isDir){
                        displayFileToDir(fileDir,exportDir)
                    }
                })
            })
        })
    }
    displayFileToDir(filePath,exportDir)
}
module.exports = {exportFileToDir}