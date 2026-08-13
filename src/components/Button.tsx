type Props = {
    supplied_id: string;
    supplied_type: 'button' | 'submit' | 'reset';
    supplied_label: string
};

export default function Button({ supplied_id, supplied_type, supplied_label }: Props) {
    return (
        <>
        <button id={supplied_id} type={supplied_type}>
            <span id="button_text">{supplied_label}</span>
            <span id="spinner" className="spinner" aria-hidden="true"></span>
        </button>
        </>
    )
}