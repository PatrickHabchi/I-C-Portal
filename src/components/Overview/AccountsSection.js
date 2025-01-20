import React from 'react';
import OverviewAccountSkeleton from '../skeletons/OverviewAccountSkeleton';

function AccountsSection({ accountLoading, currency, balance, cardTitle, amount, amount1 }) {
    return (
        <>
            {!accountLoading ? (
                <div className='col-md-5'>
                    <div className="accountDetail">
                        <div className='card-title'>{cardTitle}</div>
                        <div className='accountBalance'>{currency} {balance} </div>
                        <hr />

                        <div className='accountAmount'>
                            {cardTitle === "POOL USD ACCOUNT" ? (
                                <>
                                    <div className='amount'>
                                        <div className='balance'>{currency} {amount}</div>
                                        <div className='amountType'>Available</div>
                                    </div>

                                    <div className='amount'>
                                        <div className='balance'>{currency} {amount}</div>
                                        <div className='amountType'>Book</div>
                                    </div> 

                                    <div className='amount'>
                                        <div className='balance'>{currency} {amount}</div>
                                        <div className='amountType'>Held</div>
                                    </div>
                                    </>
                                    ) : (
                                    <>
                                     <div className='amount'>
                                        <div className='balance'>{amount}</div>
                                        <div className='amountType'>Suyool</div>
                                    </div>

                                    <div className='amount'>
                                        <div className='balance'>{amount1}</div>
                                        <div className='amountType'>I&C Regular Account</div>
                                    </div>
                                    
                                   
                                    </>
                            )}
                                </div>

                           
                        </div>

                    </div>
          
            ) : (
                <OverviewAccountSkeleton />
            )}
        </>


    );
}

export default AccountsSection;
