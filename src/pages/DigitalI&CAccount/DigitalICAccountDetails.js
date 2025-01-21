import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setActiveButton, setActiveTab } from '../../app/DigitalI&CAccountSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan } from '@fortawesome/free-solid-svg-icons';

function DigitalICAccountDetails() {

  const activeTab = useSelector((state) => state.digitalICaccount.activeTab);
  const userData = useSelector((state) => state.appData.userData);
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
      { key: "First Name", value: "Tarek" },
      { key: "Last Name", value: "Haddad" },
      { key: "Mother Name", value: "SOTIRA" },
    ],
    Citizenship: [
      { key: "Country", value: "Lebanon" },
      { key: "Nationality", value: "Lebanese" },
    ],
    Address: [
      { key: "City", value: "Beirut" },
      { key: "Street", value: "Hamra Street" },
    ],
    "Business Information": [
      { key: "Company", value: "Suyool Inc." },
      { key: "Position", value: "Manager" },
    ],
    "Account Information": [
      { key: "Account Type", value: "Individual" },
      { key: "Status", value: "New" },
    ],
  };

  const handleStatusStyle = (value) => {
    if (value === "New") {
      return {
        color: "#3267AD",
        backgroundColor: "#e8eef6",
      };
    }

    return {};
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
          <img src='./Images/newApplicationI&C.png' />
        </div>
        <div className='user-details'>
          <div className='user-info-container'>
            <div className='user-basic-info'>
              <div className='user-name'>
                TAREK HADDAD
              </div>
              <div className='user-status' style={handleStatusStyle("New")}>
                New
              </div>
            </div>

            <div className='user-contact-info'>
              <div className='user-email'>
                Tarek.Haddad@gmail.com
              </div>
              <div className='user-phonenumber'>+961 3 33 33 33</div>
            </div>
          </div>
        </div>
      </div>

      <div className='main-container'>

        <div className='entity-info-container'>
          <div className='entity-details'>
            <div className='entityID'>
              <div className='id'>
                000030
              </div>
              <div className='key'>
                Entity ID
              </div>

              <hr />

              <div className='entity-cards'>
                <div className='card custom-card'>
                  <div className='card-value'>Individual</div>
                  <div className='card-label'>Account Type</div>
                </div>

                <div className='card'>
                  <div className='card-value'>30 Oct 2024</div>
                  <div className='card-label'>Creation Date</div>
                </div>

                <div className='card'>
                  <div className='card-value'>30 Oct 2024</div>
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