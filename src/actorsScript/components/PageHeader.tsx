
export const PageHeader = ({ icon, title }: { icon: React.ReactNode, title: string }) => {
    return (
        <div className="page-header">
            {icon}
            <h1>{title}</h1>
        </div>
    )
}
