import axios from 'axios';


async function getFlags() {

try {

    const data = await axios.get('https://restcountries.eu/rest/v2/all')
    
    console.log(data.data[0].flag)
    
} catch (error) {

    console.log(error)
}
         
                
}

const flags = getFlags()
console.log(flags)


export default getFlags