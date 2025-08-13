import { useState, useEffect } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import OrdersTable from './OrdersTable';



function App() {

  const [resourceTypes, setResourceTypes] = useState([]);
  const [resourceNames, setResourceNames] = useState([]);
  const [instanceTypes, setInstanceTypes] = useState([]);
  const [regionNames, setRegionNames] = useState([]);
  const [currentTotalCost, setCurrentTotalCost] = useState();

  const [currentSelectedItems, setCurrentSelectedItems] = useState([]);

  const [subTotal, setSubTotal] = useState(0);

  // State to track selected values for cascading logic
  const [currentSelectedResourceType, setCurrentSelectedResourceType] = useState('');
  const [currentSelectedResourceName, setCurrentSelectedResourceName] = useState('');
  const [currentSelectedInstanceType, setCurrentSelectedInstanceType] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const appendToCurrentSelectedItems = (currentSelectedItems, response, totalCost) => {
    setCurrentTotalCost(totalCost);
    setSubTotal(prevSubTotal => prevSubTotal + parseFloat(totalCost.toFixed(2)));


  }
  const renderOptions = (options, key, value) => {
    if (options.length === 0) {
      return <option value="" disabled>Loading...</option>;
    }
    return options.map(option => (
      <option key={option[key]} value={option[value]}>{option[value]}</option>
    ));
  };

  const [formData, setFormData] = useState({
    typeName: '',
    resourceName: '',
    numberOfUnits: 0,
    instanceType: '',
    regionCode: {
      regionCode: ''
    }
  })


  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');
  const apiUrl = 'http://localhost:8080/compute/computeCurrentInstance';

  try {
    // Use the formData as the body
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        typeName: formData.typeName,
        resourceName: formData.resourceName,
        numberOfUnits: formData.numberOfUnits,
        instanceType: formData.instanceType,
        regionCode: { regionCode: formData.regionCode.regionCode }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API request failed with status: ${response.status}`);
    }
    const result = await response.json();
    
    setCurrentTotalCost(result.totalCost)
    setSubTotal(prevTotal => prevTotal + result.totalCost)

    const newItem = {
      ...formData,
      totalCost: result.totalCost

    };


    setCurrentSelectedItems(prevItems => [...prevItems,newItem])
    resetForm();
    console.log(currentSelectedItems);
  } catch (error) {
    setMessage(`Error: ${error.message}`);
  } finally {
    setLoading(false);
  }
};


const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === 'typeName') {
    setCurrentSelectedResourceType(value);
    setFormData(prev => ({ ...prev, typeName: value }));
  } else if (name === 'resourceName') {
    setCurrentSelectedResourceName(value);
    setFormData(prev => ({ ...prev, resourceName: value }));
  } else if (name === 'instanceType') {
    setCurrentSelectedInstanceType(value);
    setFormData(prev => ({ ...prev, instanceType: value }));
  } else if (name === 'regionCode') {
    setFormData(prev => ({
      ...prev,
      regionCode: { regionCode: value }
    }));
  } else {
    setFormData(prev => ({ ...prev, [name]: value }));
  }
};

  const resetForm = (e) => {
    setFormData({
      typeName: '',
      resourceName: '',
      numberOfUnits: 0,
      instanceType: '',
      regionCode: {
        regionCode: ''
      }
    });
  }


  //use effect for fetching resource types like compute, storage, networking
  useEffect(() => {
    const fetchResourceTypes = async () => {
      setLoading(true);
      try {
        const apiEndpoint = 'http://localhost:8080/resources/getResources';
        const response = await fetch(apiEndpoint);
        if (!response.ok) throw new Error('Failed to fetch resource types');
        const data = await response.json();
        setResourceTypes(data);
        if (data.length > 0) setCurrentSelectedResourceType(data[0].resourceTypeName);
      } catch (error) {
        setMessage(`Error: ${error.message}`);
        console.error('Error fetching resource types:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResourceTypes();
  }, []);

  useEffect(() => {
    if (!currentSelectedResourceType) return;
    const fetchResourceNames = async () => {
      setLoading(true);
      try {
        const apiEndpoint = `http://localhost:8080/resources/getSpecificResources/${currentSelectedResourceType}`;
        const response = await fetch(apiEndpoint);
        if (!response.ok) throw new Error('Failed to fetch resource names');
        const data = await response.json();
        setResourceNames(data);
        if (data.length > 0) setCurrentSelectedResourceName(data[0].resourceName);
      } catch (error) {
        setMessage(`Error: ${error.message}`);
        console.error('Error fetching resource names:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResourceNames();
  }, [currentSelectedResourceType] );

  // Fetches Instance Types whenever Resource Name changes
  useEffect(() => {
    if (!currentSelectedResourceName) return;
    const fetchInstanceTypes = async () => {
      setLoading(true);
      try {
        const apiEndpoint = `http://localhost:8080/instance/getAllInstances/${currentSelectedResourceName}`;
        const response = await fetch(apiEndpoint);
        if (!response.ok) throw new Error('Failed to fetch instance types');
        const data = await response.json();
        setInstanceTypes(data);
        if (data.length > 0) setCurrentSelectedInstanceType(data[0].instanceType);
      } catch (error) {
        setMessage(`Error: ${error.message}`);
        console.error('Error fetching instance types:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInstanceTypes();
  }, [currentSelectedResourceName]);


  useEffect(() => {
  if (!currentSelectedInstanceType || !currentSelectedResourceName) return;
  const controller = new AbortController();
  const fetchRegionNames = async () => {
    setLoading(true);
    try {
      const apiEndpoint = `http://localhost:8080/regions/getregionByResource/${currentSelectedResourceName}/${currentSelectedInstanceType}`;
      const response = await fetch(apiEndpoint, { signal: controller.signal });
      if (!response.ok) throw new Error('Failed to fetch region names');
      const data = await response.json();
      setRegionNames(data);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  fetchRegionNames();
  return () => controller.abort();
}, [currentSelectedInstanceType, currentSelectedResourceName]);


  return (

      <div className=' box-border m-0 p-0  h-screen w-screen flex-1    overflow-x-hidden'>
      <h1 className='font-bold items-center  justify-center align-center self-center grid grid-cols-3 col-start-2'>
        <span className='col-start-2'> <span className='text-orange-400'>Order </span> History</span>
        <div class="relative  h-40">
          <div class="fixed top-10 left-10  text-white p-2">
            <Link to={"/"}>
            <button className=' px-2 py-2 flex flex-1 justify-center items-center self-center text-slate-900 text-xl rounded-md bg-amber-500 hover:bg-orange-500 transition transition-all duration-300 hover:cursor-pointer' > <img src="/arrow.png" width={20} className='m-1' height={20} alt="" />Back</button>
            </Link>
          </div>
        </div>

      </h1>




        <div className='grid w-full items-center mx-auto justify-center align-center '>

          <OrdersTable/>
        </div>
      <div className='flex justify-center w-1/2 mx-auto self-end  items-center   p-4'>
      </div>
    </div>
  )
}

export default App

