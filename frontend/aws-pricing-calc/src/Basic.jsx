import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

// Main App component
const Basic = () => {

    // State variables for the dropdown options
    const [resourceTypes, setResourceTypes] = useState([]);
    const [resourceNames, setResourceNames] = useState([]);
    const [instanceTypes, setInstanceTypes] = useState([]);
    const [regionNames, setRegionNames] = useState([]);

     

    // State to track selected values for cascading logic
    const [currentSelectedResourceType, setCurrentSelectedResourceType] = useState('');
    const [currentSelectedResourceName, setCurrentSelectedResourceName] = useState('');
    const [currentSelectedInstanceType, setCurrentSelectedInstanceType] = useState('');


    
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Fetches Resource Types on initial component mount
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

    // Fetches Resource Names whenever Resource Type changes
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
    }, [currentSelectedResourceType]);

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

    // Fetches Region Names whenever Instance Type changes
    useEffect(() => {
        if (!currentSelectedInstanceType) return;
        const fetchRegionNames = async () => {
            setLoading(true);
            try {
                const apiEndpoint = `http://localhost:8080/regions/getregionByResource/${currentSelectedResourceName}`;
                console.log("DEBUG") 
                const response = await fetch(apiEndpoint);
                if (!response.ok) throw new Error('Failed to fetch region names');
                const data = await response.json();
                setRegionNames(data);
                console.log("DEBUG");
                
            } catch (error) {
                setMessage(`Error: ${error.message}`);
                console.error('Error fetching region names:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRegionNames();
    }, [currentSelectedInstanceType]);

    // Function to handle form submission and API call
//     const handleSubmit = async (values, { setSubmitting }) => {
//         setLoading(true);
//         setMessage('');
//         const apiUrl = 'http://localhost:8080/compute/computeCurrentInstance';

//         try {
//             const response = await fetch(apiUrl, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     typeName: values.resourceType,
//                     resourceName: values.resourceName,
//                     numberOfUnits: values.numberOfUnits,
//                     instanceType: values.instanceType,
//                     regionCode: { regionCode: values.regionCode }
//                 }),
//             });
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || `API request failed with status: ${response.status}`);
//             }
//             const result = await response.json();
//             setMessage(`Total Cost: $${result.totalCost.toFixed(2)}`);
//         } catch (error) {
//             console.error('Submission error:', error);
//             setMessage(`Error: ${error.message}`);
//         } finally {
//             setLoading(false);
//             setSubmitting(false);
//         }
//     };

    const handleSubmit = async (values, { setSubmitting }) => {
        setLoading(true);
        setMessage('');

        console.log("Reached handle submit");
        
        
        const apiUrl = 'http://localhost:8080/compute/computeCurrentInstance';

        try {
            console.log(values);
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    typeName: values.resourceType,// todo
                    resourceName: values.resourceName, //todo 
                    numberOfUnits: values.numberOfUnits,
                    instanceType: values.instanceType, //todo 
                    regionCode: { regionCode: values.regionCode } // Assuming API expects object
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `API request failed with status: ${response.status}`);
            }

            const result = await response.json();
            setMessage(`Total Cost: $${result.totalCost.toFixed(2)}`);
        } catch (error) {
            console.error('Submission error:', error);
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };


    const renderOptions = (options, key, value) => {
        if (options.length === 0) {
            return <option value="" disabled>Loading...</option>;
        }
        return options.map(option => (
            <option key={option[key]} value={option[value]}>{option[value]}</option>
        ));
    };



    return (
        <div className="min-h-screen bg-gray-100 flex items-center  justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    AWS Pricing Calculator
                </h1>
                <Formik
                    initialValues={{
                        resourceType: currentSelectedResourceType,
                        resourceName: currentSelectedResourceName,
                        instanceType: currentSelectedInstanceType,
                        regionCode: '',
                        numberOfUnits: '',
                    }}
                    enableReinitialize={true}
                    validate={values => {
                        const errors = {};
                        if (!values.numberOfUnits || values.numberOfUnits <= 0) {
                            errors.numberOfUnits = 'Number of units must be a positive integer';
                        }
                        return errors;
                    }}
                    onSubmit={handleSubmit}
                > 


                    {({  isSubmitting, setFieldValue }) => (
                        <Form className="space-y-4">

                            {/* Resource Type Dropdown */}
                            <div>
                                <label htmlFor="resourceType" className="block text-sm font-medium text-gray-700">
                                    Resource type
                                </label>
                                <Field
                                    as="select"
                                    name="resourceType"
                                    className="mt-1 text-black block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={e => {
                                        setCurrentSelectedResourceType(e.target.value);
                                        setFieldValue('resourceType', e.target.value);
                                    }}
                                    value={currentSelectedResourceType}
                                >
                                    {loading ? (
                                      <option value="" disabled>Loading...</option>
                                    ) : (
                                      <>
                                        <option value="" disabled>Select a resource type</option>
                                        {renderOptions(resourceTypes, 'id', 'resourceTypeName')}
                                      </>
                                    )}
                                </Field>
                            </div>

                            {/* Resource Dropdown */}
                            <div>
                                <label htmlFor="resourceName" className="block text-sm font-medium text-gray-700">
                                    Resource name
                                </label>
                                <Field
                                    as="select"
                                    name="resourceName"
                                    className="mt-1 text-black block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={e => {
                                        setCurrentSelectedResourceName(e.target.value);
                                        setFieldValue('resourceName', e.target.value);
                                    }}
                                    value={currentSelectedResourceName}
                                >
                                    {loading ? (
                                      <option value="" disabled>Loading...</option>
                                    ) : (
                                      <>
                                        <option value="" disabled>Select a resource name</option>
                                        {renderOptions(resourceNames, 'id', 'resourceName')}
                                      </>
                                    )}
                                </Field>
                            </div>
                            
                            {/* Instance Type Dropdown */}
                            <div>
                                <label htmlFor="instanceType" className="block text-sm font-medium text-gray-700">
                                    Instance Type
                                </label>
                                <Field
                                    as="select"
                                    name="instanceType"
                                    className="mt-1 text-black block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={e => {
                                        setCurrentSelectedInstanceType(e.target.value);
                                        setFieldValue('instanceType', e.target.value);
                                    }}
                                    value={currentSelectedInstanceType}
                                >
                                    {loading ? (
                                      <option value="" disabled>Loading...</option>
                                    ) : (
                                      <>
                                        <option value="" disabled>Select an instance type</option>

                                                {instanceTypes.map((region, index) => (
                                                    <option key={index} value={region}>
                                                        {region}
                                                    </option>
                                                ))}
                                      </>
                                    )}
                                </Field>
                            </div>

                            {/* Region Dropdown */}
                            <div>
                                <label htmlFor="regionCode" className="block text-sm font-medium text-gray-700">
                                    Region
                                </label>
                                <Field
                                    as="select"
                                    name="regionCode"
                                    className="mt-1 text-black block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    onChange={e => {
                                        setFieldValue('regionCode', e.target.value);
                                    }}
                                    value={regionNames.length > 0 ? regionNames[0].regionName : ''}
                                >
                                    {loading ? (
                                      <option value="" disabled>Loading...</option>
                                    ) : (
                                      <>
                                        <option value="" className='bg-black text-blue' disabled>Select a region</option>
                                                {regionNames.map((region, index) => (
                                                    <option key={index} value={region}>
                                                        {region}
                                                    </option>
                                                ))}
                                      </>
                                    )}
                                </Field>
                            </div>

                            {/* Units Input Field */}
                            <div>
                                <label htmlFor="numberOfUnits" className="block text-sm font-medium text-gray-700">
                                    Number of Units (e.g., hours)
                                </label>
                                <Field
                                    type="number"
                                    name="numberOfUnits"
                                    min="1"
                                    className="mt-1 text-black block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <ErrorMessage name="numberOfUnits" component="div" className="mt-1 text-red-500 text-xs" />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Calculating...' : 'Submit'}
                            </button>
                        </Form>
                    )}
                </Formik>
                {message && (
                    <div
                        className={`mt-4 p-4 rounded-md ${
                            message.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}
                        role="alert"
                    >
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Basic;
