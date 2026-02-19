import type { BaseControlProps } from './base-control';

export interface FileInputProps extends BaseControlProps {
    documentType?: string;
    accept?: string;
    allowedTypesFriendlyName?: string;
    id?: string;
    handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    placeholder?: string | boolean;
    value?: any;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    allowedSizeInByte?: number;
    hideView?: boolean | (() => boolean)
}


