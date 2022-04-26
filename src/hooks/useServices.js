import { useEffect, useState } from "react";

const useServices = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch('https://powerful-hollows-72000.herokuapp.com/services')
        .then(res => res.json())
        .then(data => setServices(data))
    }, [])
    return [services, setServices];
}

export default useServices;