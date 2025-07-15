'use client';

import CheckboxField from '@/components/ext/form/CheckboxField';
import ComboBox from '@/components/ext/form/ComboBox';
import DateInput from '@/components/ext/form/DateInput';
import DisplayField from '@/components/ext/form/DisplayField';
import FileUpload from '@/components/ext/form/FileUpload';
import NumberInput from '@/components/ext/form/NumberInput';
import RadioGroupField from '@/components/ext/form/RadioGroupField';
import TextArea from '@/components/ext/form/TextArea';
import TextInput from '@/components/ext/form/TextInput';
import TimeField from '@/components/ext/form/TimeField';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import React from 'react'

const SampleForm = () => {
    return (
        <Card className="w-full h-full p-3">
            {/* Header */}
            <h1 className="text-2xl font-bold">Sample Form</h1>
            <div className='w-full h-full grid grid-cols-2 gap-4'>
                {/* Left Section */}
                <div className="w-full space-y-4 p-4 border rounded-md">
                    <TextInput label="Name" name="name" value="" onChange={() => { }} placeholder="Enter your name" required />
                    <TextInput label="Email" name="email" value="" onChange={() => { }} placeholder="Enter your email" required />
                    <TextInput label="Password" name="password" value="" onChange={() => { }} placeholder="Enter your password" required />
                    <NumberInput label="Age" name="age" value={0} onChange={() => { }} placeholder="Enter your age" required />
                    <TextArea label="Description" value="" onChange={() => { }} rows={4} />
                    <CheckboxField label="Agree to terms" checked />
                    <DisplayField label="Name" value="John Doe" />
                </div>
                {/* Right Section */}
                <div className="w-full space-y-4 p-4 border rounded-md">
                    <ComboBox label="City" options={[{ label: 'New York', value: 'NY' }, { label: 'Los Angeles', value: 'LA' }, { label: 'Chicago', value: 'CH' }]} value="" onChange={() => { }} />
                    <ComboBox label="Country" options={[{ label: 'United States', value: 'US' }, { label: 'Canada', value: 'CA' }, { label: 'Mexico', value: 'MX' }]} value="" onChange={() => { }} />
                    <DateInput label="Date" name="date" value="" onChange={() => { }} required />
                    <FileUpload label="File Upload" onChange={() => { }} />
                    <TimeField label="Time" value="" onChange={() => { }} />
                    <RadioGroupField label="Gender" options={[{ label: 'Male', value: 'M' }, { label: 'Female', value: 'F' }]} value="" onChange={() => { }} />
                </div>
            </div>
            <div className="flex justify-end mt-4 gap-2">
                <Button variant="outline">Cancel</Button>
                <Button variant="default">Submit</Button>
            </div>
        </Card>
    )
}

export default SampleForm;