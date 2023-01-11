import React, { useEffect, useState } from 'react';

const options1 = []

export default function Flight() {
    
    const [image, setImage] = useState(null);
    const [route, setRoute] = useState(window.location.pathname);
  
    useEffect(() => {
        async function fetchImage(route1) {
        const response = await fetch(route1);
        const blob = await response.blob();
        setImage(URL.createObjectURL(blob));
        }
        
        if (route === '/flight') {

            fetchImage('/flight');
        }
    }, [route]);
    
    window.addEventListener('popstate', () => {
        setRoute(window.location.pathname);
    });


    const handleChange = async (event) => {
        const {name, checked} = event.target;
        if (checked){
            options1.push(name)
        }
        else {
            let index = options1.indexOf(name);
            if (index > -1) {
                options1.splice(index, 1);
            }
        }
        const response = await fetch(`/flight?options=${options1.join(",")}`);
        const blob = await response.blob();
        setImage(URL.createObjectURL(blob));
    }
    return (
        <div>
            {image && <img src={image} alt="Random Plot" />}
            <form>
                <label>
                    <input type="checkbox" name="Australia" onChange={handleChange} />
                    Australia
                </label>
            <br />
                <label>
                    <input type="checkbox" name="Thailand" onChange={handleChange} />
                    Thailand
                </label>
            <br />
                <label>
                    <input type="checkbox" name="Brazil" onChange={handleChange} />
                    Brazil
                </label>
            <br />
            </form>
        </div>
      );
}