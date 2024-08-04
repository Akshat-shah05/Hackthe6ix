const ListItem: React.FC<{ included: boolean; label: string }> = ({ included, label }) => {
    return (
        <div className="bg-white opacity-50 text-black flex flex-row justify-between w-4/5 border rounded-lg p-2 mb-1">
            <span>{label}</span>
            <span>{included ? '✔️' : '❌'}</span> {/* Display included status */}
        </div>
    );
};

export default ListItem;
