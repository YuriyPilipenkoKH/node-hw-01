const contacts = require('./contacts');
const books  = require('./books') 
// const yargs = require('yargs');
// const {hideBin}= require('yargs/helpers');
const { Command } = require('commander');



const program = new Command();

program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse()
const options = program.opts();


const invokeAction =  async ({action, id, name, email, phone, title, author}) => {
    switch(action) {

    case 'readContacts' :
        const allContacts = await contacts.listContacts()    
        return console.log(allContacts)
    case 'getById' :   
        const contact = await contacts.getContactById(id)
        return console.log(contact) 
    case 'remove':    
        const removedContact = await contacts.removeContact(id);
         return console.log(removedContact);
    case 'add':     
         const addContact = await contacts.addContact({ name, email, phone })
         return console.log(addContact);


    case 'getByName' :   
         const contactByName = await contacts.getContactByName(name)
         return console.log(contactByName) 
    case 'getByEmail' :   
         const contactByEmail = await contacts.getContactByEmail(email)
         return console.log(contactByEmail) 
    case 'getByPhone' :   
         const contactByPhone = await contacts.getContactByPhone(phone)
         return console.log(contactByPhone) 
    
    default :     
        console.log('No such action')
    }
} 


invokeAction(options);

