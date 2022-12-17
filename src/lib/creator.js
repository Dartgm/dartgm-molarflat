const path = require('path')
const fs = require('fs')
const Inquirer = require('inquirer')
const {exportFileToDir} = require('../utils/exporter')
module.exports = async function(exportDirName,options){
    const cwd = process.cwd()
    const targetDir = path.join(cwd,exportDirName)
    if(fs.existsSync(targetDir)){
        if(options.force){
            await fs.remove(exportDirName)
        }else{
            let {action} = Inquirer.prompt([
                {
                    name: 'action',
                    type: 'list',
                    choices: [
                        {
                            name: '覆盖该文件夹',
                            value: 'overwrite'
                        },
                        {
                            name: '取消操作',
                            value: 'cancel'
                        }
                    ]
                }
            ])
            if(!action){
                return
            }else if(action === 'overwrite'){
                console.log("\r\n正在移除该文件夹...")
                await fs.remove(exportDirName)
            }
        }
    }
    exportFileToDir(process.cwd(),exportDirName)
}