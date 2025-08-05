import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

// Main App component
const Basic = () => {

    // const resourceTypes = [
    //     {
    //         resourceTypeName: "compute"
    //     },
    //     {
    //         resourceTypeName: "storage"
    //     }
    // ]

    const [resourceTypes, setResourceTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const [resourceNames, setResourceNames] =  useState([]);

    //use effect for resource types
    useEffect(() => {
        const fetchResourceTypes = async () => {
            try {
                // Assume this is your API endpoint that returns the JSON array
                const apiEndpoint = 'http://localhost:8080/resources/getResources';

                const response = await fetch(apiEndpoint);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setResourceTypes(data);
                setMessage('Data loaded successfully!');
            } catch (error) {
                setMessage(`Error: ${error.message}`);
                console.error('Error fetching resource types:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResourceTypes();
    }, []);

    //use effect for resource names
    useEffect(() => {
        const fetchResourceTypes = async () => {
            try {
                // Assume this is your API endpoint that returns the JSON array
                const apiEndpoint = 'http://localhost:8080/resources/getSpecificResources';

                const response = await fetch(apiEndpoint);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setResourceNames(data);
                setMessage('Data loaded successfully!');
            } catch (error) {
                setMessage(`Error: ${error.message}`);
                console.error('Error fetching resource types:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResourceTypes();
    }, []);
    // Function to handle form submission and API call
    const handleSubmit = async (values, { setSubmitting }) => {
        setLoading(true);
        setMessage('');

        // The URL for your Spring Boot backend.
        // You may need to change this if your backend is running on a different port or path.
        const apiUrl = 'http://localhost:8080/compute/computeCurrentInstance';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    typeName: values.service,
                    resourceName: values.resource,
                    numberOfUnits: values.units,
                    instanceType: values.instance,
                    regionCode: {
                        regionCode: values.region
                    }
                }),
            });

            if (!response.ok) {
                // If the response is not OK, throw an error with the status
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

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    AWS Pricing Calculator
                </h1>
                
                {/* Formik manages the form state and validation */}
                <Formik
                    initialValues={{
                        service: 'compute',
                        resource: 'ec2',
                        instance: 't2.micro',
                        region: 'us-east-1',
                        units: 100,
                    }}
                    validate={values => {
                        const errors = {};
                        if (!values.units || values.units <= 0) {
                            errors.units = 'Number of units must be a positive integer';
                        }
                        return errors;
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            {/* Service Dropdown */}
                            <div>
                                <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                                    Resource type
                                </label>
                                <Field
                                    as="select"
                                    name="service"
                                    className="mt-1 text-black block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    {resourceTypes.map(resource => (
                                        <option key={resource.id} value={resource.resourceTypeName}>
                                            {resource.resourceTypeName}
                                        </option>
                                    ))}
                                </Field>
                            </div>

                            {/* Resource Dropdown */}
                            <div>
                                <label htmlFor="resource" className="block text-sm font-medium text-gray-700">
                                    Resource name
                                </label>
                                <Field
                                    as="select"
                                    name="resource"
                                    className="mt-1 text-black block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >


                                    {resourceNames.map(resource => (
                                        <option key={resource.id} value={resource.resourceName}>
                                            {resource.resourceName}
                                        </option>
                                    ))}
                                </Field>
                            </div>
                            
                            {/* Instance Type Dropdown */}
                            <div>
                                <label htmlFor="instance" className="block text-sm font-medium text-gray-700">
                                    Instance Type
                                </label>
                                <Field
                                    as="select"
                                    name="instance"
                                    className="mt-1 text-black block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="t2.micro">t2.micro</option>
                                    <option value="t2.small">t2.small</option>
                                    <option value="t2.medium">t2.medium</option>
                                </Field>
                            </div>

                            {/* Region Dropdown */}
                            <div>
                                <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                    Region
                                </label>
                                <Field
                                    as="select"
                                    name="region"
                                    className="mt-1 text-black block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="us-east-1">us-east-1</option>
                                    <option value="us-west-2">us-west-1</option>
                                    <option value="eu-central-1">ap-south-1</option>
                                </Field>
                            </div>

                            {/* Units Input Field */}
                            <div>
                                <label htmlFor="units" className="block text-sm font-medium text-gray-700">
                                    Number of Units (e.g., hours)
                                </label>
                                <Field
                                    type="number"
                                    name="units"
                                    min="1"
                                    className="mt-1 text-black block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <ErrorMessage name="units" component="div" className="mt-1 text-red-500 text-xs" />
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

                {/* Message box for success or error */}
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
