type Props = {
    supplied_id: string;
    supplied_label: string;
    isRequired: boolean;
    choice_list: string[][];
};

export default function InputSelect({ supplied_id, supplied_label,  isRequired, choice_list }: Props) {
    return (
        <div>
            <label htmlFor={supplied_id}>{supplied_label}</label>
            <select id={supplied_id} name={supplied_id} required={isRequired}>
                {choice_list.map((optionGroup, index) => (
                    <optgroup key={index} label={optionGroup[0]}>
                        {optionGroup.slice(1).map((option, optionIndex) => (
                            <option key={optionIndex} value={option}>{option}</option>
                        ))}
                    </optgroup>
                ))}
                    
            </select>
        </div>
    );
}

