
type Action = 'Nation Created' | 'Citizenship Claimed' | 'Registered to Vote' | 'Award Granted' | 'Delegated';

type Contract = {
    name: string;
    link: string;
};

type TableItem = {
    action: Action;
    contract: Contract;
    ethereumAddress: string;
    country: string;
};

const tableData: TableItem[] = [
    {
        action: 'Nation Created',
        contract: { name: 'ThePeople', link: 'https://example.com/thepeople' },
        ethereumAddress: '0x1234567890abcdef',
        country: 'US',
    },
    {
        action: 'Nation Created',
        contract: { name: 'ThePeople', link: 'https://example.com/thepeople' },
        ethereumAddress: '0x1234567890abcdef',
        country: 'US',
    },
    // Add more items here...
];

const HomeTable = () => {
    return (
        <div className="overflow-x-auto">
        <table className="table table-xs">
            <thead>
                <tr>
                    <th>Action</th>
                    <th>Contract</th>
                    <th>Ethereum Address</th>
                    <th>Country</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((item, index) => (
                    <tr key={index}>
                        <td>
                        <div class="badge">{item.action}</div>
                            {/* <Badge type={item.action.toLowerCase().replace(/\s/g, '-')}>
                                {item.action}
                            </Badge> */}
                        </td>
                        <td>
                            {item.contract.name}{' '}
                            <a href={item.contract.link} target="_blank" rel="noopener noreferrer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 inline-block"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 00-2 0v4a1 1 0 002 0V7zm0 6a1 1 0 100-2 1 1 0 000 2z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </td>
                        <td>{item.ethereumAddress}</td>
                        <td>{item.country}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
};

export default HomeTable;
