const fs = require('fs/promises')
const { nanoid } = require('nanoid')
const path = require('path')

const contactsPath = path.join(__dirname, './db/contacts.json')

const listContacts = async () => {
  
    const data = await fs.readFile(contactsPath, 'utf-8') 
    return JSON.parse(data)
   
}

const getContactById = async (id) => {
   
    const allContacts = await listContacts();
    const result = allContacts.find(item => item.id === id )
    return result || null

}
const removeContact = async (id) => {
    const allContacts = await listContacts();
    const index  = allContacts.findIndex(item => item.id === id)
     if (index === -1){
        return null
     }
     const result = allContacts.splice(index, 1)
     await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2))
     return result

}

const addContact = async (data) => {
    const allContacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data,

    }
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact;
}

const getContactByName = async (name) => {
    const normalizedName = name.toLowerCase()
    const allContacts = await listContacts();
    const result = allContacts.filter(item => {
        // console.log(item.name.toLowerCase())
      return  item.name.toLowerCase().includes(normalizedName)
    } )
    return result.length === 0
            ? null
            : result.length === 1
               ?  result[0]
               :  result
}

const getContactByEmail = async (email) => {
    const normalizedEmail = email.toLowerCase()
    const allContacts = await listContacts();
    const result = allContacts.filter(item => {
        
      return  item.email.toLowerCase().includes(normalizedEmail)
    } )
    return result.length === 0
            ? null
            : result.length === 1
               ?  result[0]
               :  result
}

const getContactByPhone = async (phone) => {

    const allContacts = await listContacts();
    const result = allContacts.filter(item => {
        
      return  item.phone.includes(phone)
    } )
    return result.length === 0
            ? null
            : result.length === 1
               ?  result[0]
               :  result
}



module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    getContactByName,
    getContactByEmail,
    getContactByPhone,
}
  

