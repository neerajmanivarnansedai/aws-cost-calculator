import { useState, useEffect } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

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
        {/* <Routes>
          <Route path='/' element={<App />} />
          <Route path='/history' element={<OrderHistory />} />
        </Routes> */}
      <h1 className='font-bold items-center  justify-center align-center self-center grid grid-cols-3 col-start-2'>
        <span className='col-start-2'> <span className='text-orange-400'>AWS </span> Pricing Calculator</span>
        <div class="relative  h-40">
          <div class="absolute top-0 right-0  text-white p-2">
            <button className=' p-3 rounded-md hover:bg-slate-900 transition transition-all duration-300 hover:cursor-pointer' onClick={() => navigate('/history')}><img src="/history.png" alt="" /></button>
          </div>
        </div>

      </h1>
        <div className='grid w-full items-center mx-auto justify-center align-center '>
          <form onSubmit={handleSubmit} className='bg-[#232f3e] w-300 mx-auto grid rounded-md '>
            <div className='flex  justify-end px-10  flex-1  flex-row pt-2  '>
              <label className=' font-semibold m-4  w-120'>
                Select Resource Type:
                <select name="typeName" value={formData.typeName} onChange={handleChange} className='m-3 w-60 p-3 border-0 shadow-lg bg-gray-600 rounded-md px-6'>
                  {loading ? (
                    <option value="" disabled>Loading...</option>
                  ) : (
                    <>
                      <option value="" disabled>Select a resource type</option>
                      {renderOptions(resourceTypes, 'id', 'resourceTypeName')}
                    </>
                  )}
                </select>
              </label>
              <br />

              <label className='m-4 font-semibold  w-200'>
                Resource Name:
                <select name="resourceName" value={formData.resourceName} onChange={handleChange} className='m-3 w-60 border-0 shadow-lg bg-gray-600 rounded-md p-3 px-6'>
                  {loading ? (
                    <option value="" disabled>Loading...</option>
                  ) : (
                    <>
                      <option value="" disabled>Select a resource name</option>
                      {renderOptions(resourceNames, 'id', 'resourceName')}
                    </>
                  )}
                </select>

              </label>
              <br />
            </div>

            <div className='  flex flex-1  justify-end flex-row px-10 '>

              <label className='m-2 font-semibold  w-120'>
                Instance Type:
                <select name="instanceType" value={formData.instanceType} onChange={handleChange}className='m-3  w-60 p-3 border-0 shadow-lg px-6 bg-gray-600 rounded-md'>
                {loading ? (
                  <option value="" disabled>Loading...</option>
                ) : (
                  <>
                    <option  value="" disabled >Select an instance type</option>

                    {instanceTypes.map((region, index) => (
                      <option key={index} value={region}>
                        {region}
                      </option>
                    ))}
                  </>
                )}
                </select>
              </label>
              <br />

              <label className='m-1 font-semibold  w-200'>
                Region Code:
                <select name="regionCode" value={formData.regionCode.regionCode} onChange={handleChange} className='m-3 w-60 m-3 p-3 shadow-lg border-0 bg-gray-600 rounded-md'>
                  {loading ? (
                    <option value="" disabled>Loading...</option>
                  ) : (
                    <>
                      <option value="" className='bg-gray-600 text-blue' disabled>Select a region</option>
                      {regionNames.map((region, index) => (
                        <option key={index} value={region} className='bg-gray-600'>
                          {region}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </label>
              <br />


            </div>

            <div className='flex justify-center  w-full' >
              <label className='m-0 grid font-semibold justify-center'>

                Number of Units:
                <input type="number" value={formData.numberOfUnits} name='numberOfUnits' onChange={handleChange} className='m-3 shadow-lg p-3 border-0 bg-gray-600 w-60 selected:border-none rounded-md  '/>
              </label>
              <br />
            </div>
                  <div className=''>

                    <button type="submit" className='m-4 bg-amber-500 py-3 px-5 rounded-4xl hover:cursor-pointer font-semibold hover:bg-orange-500 text-cyan-950 shadow-lg transition duration-300 transition-all'>Add to cart</button>
                    <button type="button" onClick={resetForm} className='m-4  py-3 px-5 rounded-4xl hover:cursor-pointer font-semibold hover:bg-slate-200 hover:text-black hover:shadow-lg transition duration-300 transition-all'>Reset</button>
                  </div>
          </form>
        </div>
      <div className='flex justify-center w-1/2 mx-auto self-end  items-center   p-4'>
        {currentSelectedItems.length > 0 && (

          <div className="transition-opacity duration-300  relative flex-1 overflow-x-auto p-8  justify-center items-center flex-col bg-slate-700 w-1/3 h-full overflow-scroll text-white  shadow-md rounded-xl bg-clip-border">
            <h1><span className='text-orange-400 font-bold'>Price </span>Summary</h1>

            <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white rounded-lg bg-clip-border">
              <table id="productTable" className="w-full bg-slate-700 text-left table-auto min-w-max">
                <thead className='bg-gray-400'>
                  <tr>
                    <th className="p-4 border-b border-slate-300 bg-gray-500">
                      <p className="block text-sm font-bold leading-none text-white">
                        Resource
                      </p>
                    </th>
                    <th className="p-4 border-b border-slate-300 bg-gray-500">
                      <p className="block text-sm font-bold leading-none text-white">
                        Price
                      </p>
                    </th>
                    <th className="p-4 border-b border-slate-300 bg-gray-500">
                      <p className="block text-sm font-bold leading-none text-white">
                        Quantity
                      </p>
                    </th>
                    <th className="p-4 border-b border-slate-300 bg-gray-500">
                      <p className="block text-sm font-bold leading-none text-white  ">
                        Total
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody className='mb-20'>
                  {currentSelectedItems.map((item, index) => (
                    <tr  key={index} className="hover:bg-slate-50">
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm font-semibold text-white">
                          {item.resourceName}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm font-semibold text-white">
                          {((item.totalCost/720) / item.numberOfUnits).toFixed(2)}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm font-semibold text-white">
                          {item.numberOfUnits}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm font-semibold text-white">
                          {item.totalCost.toFixed(2)}
                        </p>
                      </td>
                    </tr>
                  )
                  )}
                </tbody>
                <tfoot >
                  <tr>
                    <td colSpan={2} className="p-4 text-left text-xl font-bold text-white border-t border-slate-300">
                      Total:
                    </td>
                    <td></td>
                    <td colSpan={4} className="p-4 font-semibold text-xl text-white border-t border-slate-300">
                      {subTotal.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>

                <div className='flex justify-end bg-slate-700'>
                  <button className='bg-amber-500 text-cyan-950 font-bold hover:cursor-pointer hover:bg-orange-500 transition duration-300 transition-all p-3 rounded-4xl'
                  onClick={() => {
                      alert(JSON.stringify(currentSelectedItems,null,2))
                  }} 
                  >Confirm Order</button>
                </div>
            </div>
          </div>

        )}
      </div>
    </div>
  )
}

export default App

