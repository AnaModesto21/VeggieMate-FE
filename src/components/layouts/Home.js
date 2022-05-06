import React, { Fragment, useEffect, useState } from 'react'
import MetaData from './MetaData'
import { getProducts } from '../layouts/actions/productActions'
import Product from '../product/Product';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Pagination from 'react-js-pagination';
import { useAlert } from 'react-alert';

import { useParams } from 'react-router-dom'

const Home = () => {

    const [currentPage, setCurrentPage ] = useState(1)
    const [category, setCategory] = useState('')

    const categories =[
        'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                "Books",
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
    ]

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, products, error, productsCount, resPerPage, filteredProductsCount  } = useSelector(state => state.products )


    const params = useParams()
    const keyword = params.keyword

  useEffect(() => {
        if(error) {
            alert.error(error)
        }

    dispatch(getProducts(keyword, currentPage));


  }, [dispatch,alert, error, currentPage, keyword])

  function setCurrentPageNo(pageNumber) {
      setCurrentPage(pageNumber)
}
    
    let count = productsCount;
    if (keyword) {
        count = filteredProductsCount
    }

  
  return (
    <Fragment>
        {loading ? <Loader /> : (
            <Fragment>
                <MetaData title={'VeggieMate to the rescue!'} />

                <h1 id="products_heading">Latest Products</h1>

                <section id="products" className="container mt-5">
                    <div className="row">
                    {products && products.map(product => (
                      <Product key={ product._id} product={product}/>
                    ))}
                        

                    </div>
                </section>

                {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}



            </Fragment>
        )}

    </Fragment>
)
}

export default Home
