type Props = {
    supplied_id: string;
    supplied_label: string;
    supplied_type: string;
    isRequired: boolean;
};

export default function InputField({ supplied_id, supplied_label, supplied_type, isRequired }: Props) {
    return (
        <div>
            <label htmlFor={supplied_id}>{supplied_label}</label>
            <input id={supplied_id} type={supplied_type} required={isRequired} />
        </div>
    );
}