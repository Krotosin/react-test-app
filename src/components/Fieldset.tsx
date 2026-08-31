import "../styles/fieldset.css"

type fieldsetProps = {
    fieldsetTitle: string;
    children: React.ReactNode;
};

export default function Fieldset({ fieldsetTitle, children }: fieldsetProps) {
    return (
        <fieldset>
            <legend>{fieldsetTitle}</legend>
            {children}
        </fieldset>
    )
}