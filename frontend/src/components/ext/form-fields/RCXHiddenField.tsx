import * as React from 'react';
import { Input } from '@/components/ui/input';

export interface RCXHiddenFieldProps {
    name: string;
    value?: string;
}

const RCXHiddenField: React.FC<RCXHiddenFieldProps> = ({ name, value, ...props }) => (
    <Input type="hidden" name={name} value={value} {...props} />
);

export default RCXHiddenField; 