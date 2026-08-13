type Props = {
    fieldset_title: string;
    children: React.ReactNode;
};

export default function Fieldset({ fieldset_title, children }: Props) {
    return (
        <fieldset>
            <legend>{fieldset_title}</legend>
            {children}
        </fieldset>
    )
}