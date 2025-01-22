import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setActiveButton, setActiveTab } from '../../app/DigitalI&CAccountSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan } from '@fortawesome/free-solid-svg-icons';
import UtcToLocal from '../../utils/UTCToLocal';

function DigitalICAccountDetails() {

  const activeTab = useSelector((state) => state.digitalICaccount.activeTab);
  const userData = useSelector((state) => state.appData.userData);
  const singleUserData = useSelector((state) => state.appData.singleUserData);

  console.log(singleUserData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveTab("Personal Info"))
  }, [])

  const tabs = [
    "Personal Info",
    "Citizenship",
    "Address",
    "Business Information",
    "Account Information",
  ];

  const tabContent = {
    "Personal Info": [
      { key: "First Name", value: singleUserData.FirstName },
      { key: "Last Name", value: singleUserData.FirstName },
      { key: "Mother Name", value: singleUserData.MotherName },
    ],
    Citizenship: [
      { key: "Country", value: singleUserData.CountryOfActivity },
      { key: "Nationality", value: "Lebanese" },
    ],
    Address: [
      { key: "City", value: singleUserData.City },
      { key: "Street", value: singleUserData.StreetNameNumber },
    ],
    "Business Information": [
      { key: "Company", value: singleUserData.NameOfCompany },
      { key: "Position", value: singleUserData.JobTitle },
    ],
    "Account Information": [
      { key: "Account Type", value: singleUserData.Type },
      { key: "Status", value: singleUserData.Status },
    ],
  };

  const handleStatusStyle = (value) => {
    if (value === "New") {
      return {
        color: "#3267AD",
        backgroundColor: "#e8eef6",
      };
    } else if (value === "Pending Compliance") {
        return {
          color: "#E2AB46",
          backgroundColor: "#FCF6EA",
        }
    } else if (value === "Cancelled") {
      return {
        color: "#5E6A7A",
        backgroundColor: "#EEF0F1",
      }
    } else if (value === "Pending Documents") {
      return {
        color: "#C23431",
        backgroundColor: "#F8E6E9",
      }
    } else if (value === "Complete") {
      return {
        color: "#64BE67",
        backgroundColor: "#e6f8e7",
      }
    } 

    return {};
  };

  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  return (
    <div className='DigitalICAccountDetails'>
      <div className='back'>
        <button className='back-button' onClick={() => dispatch(setActiveButton("I&C Table"))}>
          <FontAwesomeIcon icon={faLessThan} />
        </button>
      </div>
      <div className='user-info'>
        <div className='user-profile'>
          <img src={`https://ubuntunbk.suyool.com${singleUserData.FrontPhoto}`} />
        </div>
        <div className='user-details'>
          <div className='user-info-container'>
            <div className='user-basic-info'>
              <div className='user-name'>
                {singleUserData.FirstName} {singleUserData.LastName}
              </div>
              <div className='user-status' style={handleStatusStyle(singleUserData.Status)}>
                {singleUserData.Status}
              </div>
            </div>

            <div className='user-contact-info'>
              <div className='user-email'>
                {singleUserData.Email}
              </div>
              <div className='user-phonenumber'>{singleUserData.PhoneNumber}</div>
            </div>
          </div>
        </div>
      </div>

      <div className='main-container'>

        <div className='entity-info-container'>
          <div className='entity-details'>
            <div className='entityID'>
              <div className='id'>
              {singleUserData.id}
              </div>
              <div className='key'>
                Entity ID
              </div>

              <hr />

              <div className='entity-cards'>
                <div className='card custom-card'>
                  <div className='card-value'>{singleUserData.Type}</div>
                  <div className='card-label'>Account Type</div>
                </div>

                <div className='card'>
                  <div className='card-value'><UtcToLocal options={options} utcTimestamp={singleUserData.created} /></div>
                  <div className='card-label'>Creation Date</div>
                </div>

                <div className='card'>
                  <div className='card-value'><UtcToLocal options={options} utcTimestamp={singleUserData.updated}/></div>
                  <div className='card-label'>Opening Date</div>
                </div>

                <div className='card suyool-custom'>
                  <div className='card-value'>Suyool Statement of Account</div>
                  <div className='card-label-download'>Download Now</div>
                </div>
              </div>
            </div>
          </div>


        </div>

        <div className='tabs-and-details'>
          <div className='tabs-container'>
            <div className="tabs">
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className={`tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => dispatch(setActiveTab(tab))}
                >
                  {tab}
                </div>
              ))}
            </div>

            <div className="details-container">
              <div className="title">{activeTab}</div>
              {tabContent[activeTab]?.map((item, index) => (
                <div className="detail-item" key={index}>
                  <div className="key">{item.key}:</div>
                  <div className="value">{item.value}</div>
                </div>
              ))}

            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default DigitalICAccountDetails