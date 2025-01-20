import React from 'react';
import OverviewAccountSkeleton from '../skeletons/OverviewAccountSkeleton';

function OrdersSection({ accountLoading, orderTitle, orderNumber, count, cardImage }) {
    return (
        <>
            {!accountLoading ? (
                    <div className="OrdersDetail">
                        <div className='card-header'>
                            <div className='order-type'>
                                <div className='order-count'>{orderNumber} </div>
                                <div className='order-title'>{orderTitle}</div>
                            </div>

                            <div className='card-image'>
                            <img src={cardImage}/>
                            </div>

                        </div>
                        <hr />

                        <div className='orderStatus'>
                            
                        <div className='statusOfOrder'>
                            <div className='count'>{count}</div>
                            <div className='status-type'>Pending</div>
                        </div>

                                    <div className='statusOfOrder'>
                                        <div className='count'>{count}</div>
                                        <div className='status-type'>In Compliance Review</div>
                                    </div> 

                                    <div className='statusOfOrder'>
                                        <div className='count'>{count}</div>
                                        <div className='status-type'>Total Completed</div>
                                    </div>
                                    
                      
                                </div> 
                        </div>
          
            ) : (
                <OverviewAccountSkeleton />
            )}
        </>


    );
}

export default OrdersSection;
