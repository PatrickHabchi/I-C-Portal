import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../../utils/Style/component/skeleton.scss';

const OverviewAccountSkeleton = () => (
    <div className='col-lg-6 col-md-12 col-sm-12'>
        <div className='row accountDetail'>
            <div className='accountType mb-3'>
                <Skeleton className="overview-accounts-divs"/>
            </div>
            <div className='accountType'>
                <Skeleton className="accountamount-skeleton"/>
            </div>
        </div>
    </div>
);

export default OverviewAccountSkeleton;