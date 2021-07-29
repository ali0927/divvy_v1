export const LIQUIDITY_ACTIVITY_COLUMNS = [
    {
        title: 'Activity Type',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'User Pubkey',
        dataIndex: 'pubkey',
        key: 'pubkey',
        render: (html: any) => <div style={{ textAlign: "left" }} dangerouslySetInnerHTML={{__html: html}} />
    },
    {
        title: 'Match',
        dataIndex: 'match',
        key: 'match',
        render: (html: any) => <div style={{ textAlign: "right" }} dangerouslySetInnerHTML={{ __html: html }} />
    },
    {
        title: 'Odds',
        dataIndex: 'odds',
        key: 'odds',
        render: (html: any) => <div style={{ textAlign: "right" }} dangerouslySetInnerHTML={{ __html: html === 0 ? "-" : html }
        } />
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        render: (html: any) => <div style={{ textAlign: "right" }} dangerouslySetInnerHTML={{ __html: html }
        } />
    }
]