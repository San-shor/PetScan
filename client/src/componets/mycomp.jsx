import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Dog from '../Data/Dog.json'
import { Button } from '@mui/material';
import DogSymptomps from '../Data/DogSymtomps.json'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const mycomp = () => {
    const [clientSymptoms, setClientSymptoms] = React.useState([]);

    let myArray = DogSymptomps;

    const handleChange = (datass) => {
        // console.log(datass);
        let selectedSymptoms = []
        datass.forEach(symptom =>{
            selectedSymptoms.push(symptom)
        })
        setClientSymptoms(selectedSymptoms);
        
    }
    const getResult = ()=>{
        // console.log(clientSymptoms);
        let result = [];

        Dog.forEach(element => {
            let findings = 0;
            clientSymptoms.forEach(symptom =>{
                if (element.symptoms.includes(symptom)) findings++
            })
            let chances =  ((findings / (element.symptoms.length) ) * 100).toFixed(2)
            const output = {
                name:element.name,
                percentage:chances
            }
            result.push(output);
        });
        console.log(result)
        result.forEach(result =>{
            if(result.percentage>1){
                console.log(result)
            }
        })
    }
    React.useEffect(()=>{
        // Dog.forEach(element => {
        //     element.symptoms.forEach(symptom => {
        //         console.log(symptom);
        //     });
        // });
    },[])
  
    return (
        <>
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={myArray}
          onChange={(e,values)=>{
            handleChange(values)
          }}
          disableCloseOnSelect
          getOptionLabel={(option) => option}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
                // onChange={handleChange(option)}
              />
              {option}
            </li>
          )}
          style={{ width: 500 , marginTop: 250, marginLeft: 40}}
          renderInput={(params) => (
            <TextField {...params} label="Select Symtomps" placeholder="Symtomps" />
          )}
        />
        <Button onClick={getResult}>Get Result</Button>
        </>
      );
    }
    
    // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
    // const top100Films = [
    //   { title: 'The Shawshank Redemption', year: 1994 },
    //   { title: 'The Godfather', year: 1972 },
    //   { title: 'The Godfather: Part II', year: 1974 },
    //   { title: 'The Dark Knight', year: 2008 },
    //   { title: '12 Angry Men', year: 1957 },
    //   { title: "Schindler's List", year: 1993 },
    //   { title: 'Pulp Fiction', year: 1994 },
    //   {
    //     title: 'The Lord of the Rings: The Return of the King',
    //     year: 2003,
    //   },
    //   { title: 'The Good, the Bad and the Ugly', year: 1966 },
    //   { title: 'Fight Club', year: 1999 },
    //   {
    //     title: 'The Lord of the Rings: The Fellowship of the Ring',
    //     year: 2001,
    //   },
    //   {
    //     title: 'Star Wars: Episode V - The Empire Strikes Back',
    //     year: 1980,
    //   },
    //   { title: 'Forrest Gump', year: 1994 },
    //   { title: 'Inception', year: 2010 },
    //   {
    //     title: 'The Lord of the Rings: The Two Towers',
    //     year: 2002,
    //   },
    //   { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    //   { title: 'Goodfellas', year: 1990 },
    //   { title: 'The Matrix', year: 1999 },
    //   { title: 'Seven Samurai', year: 1954 },
    //   {
    //     title: 'Star Wars: Episode IV - A New Hope',
    //     year: 1977,
    //   },
    //   { title: 'City of God', year: 2002 },
    //   { title: 'Se7en', year: 1995 },
    //   { title: 'The Silence of the Lambs', year: 1991 },
    //   { title: "It's a Wonderful Life", year: 1946 },
    //   { title: 'Life Is Beautiful', year: 1997 },
    //   { title: 'The Usual Suspects', year: 1995 },
    //   { title: 'Léon: The Professional', year: 1994 },
    //   { title: 'Spirited Away', year: 2001 },
    //   { title: 'Saving Private Ryan', year: 1998 },
    //   { title: 'Once Upon a Time in the West', year: 1968 },
    //   { title: 'American History X', year: 1998 },
    //   { title: 'Interstellar', year: 2014 },
    // ];

export default mycomp;