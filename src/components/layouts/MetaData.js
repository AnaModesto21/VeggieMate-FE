//adds customized title to each page

import React from 'react'
import { Helmet } from 'react-helmet'

const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title>{`${title} - Your veggie website!`}</title>
        </Helmet>
    )
}

export default MetaData;