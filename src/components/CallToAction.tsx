
export const CallToAction = ({ callToAction, linkPath, linkText }: {
    callToAction: string;
    linkPath: string;
    linkText: string;
}) => {
    return (
        <p>
            {callToAction}
            <a href={linkPath}>{linkText}</a>
        </p>)
}