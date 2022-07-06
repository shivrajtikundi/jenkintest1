import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardText,
  Button,
  CardFooter,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  FormText,
  Progress,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledButtonDropdown,
  Dropdown,
} from 'reactstrap';
import style from '../style.module.css';
import CountUp from 'react-countup';
import StarRatings from 'react-star-ratings';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Select, { components } from 'react-select';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import ReactTooltip from 'react-tooltip';
import Collapsible from 'react-collapsible';
import { alertService, appService } from '../../../services';
import Settings from 'react-multi-date-picker/plugins/settings';
import moment from 'moment';
import Loader from 'react-loaders';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LoaderAdv from 'react-loader-advanced';
import {
  faAngleDown,
  faUsers,
  faQuestion,
  faVideo,
  faWifi,
  faLifeRing,
  faExclamationCircle,
  faCog,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

// import Footer from "react-multi-date-picker/plugins/range_picker_footer";
let indexHolder = 0;
const Reviews = () => {
  console.log('reviews data');
  const listInnerRef = useRef();
  const [date_range_value, setValue] = useState([
    new DateObject().setDay(new Date().getDate()),
    new DateObject().subtract(2, 'month').setDay(new Date().getDate()),
  ]);
  const optionStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        padding: '0px',
      };
    },
  };

  const CustomControl = (props) => {
    var content = props.data;
    console.log(props, 'prps');
    return <Button {...props}>sorces</Button>;
  };

  const MultiValue = (props) => {
    const content = props.data;
    var crossbuttonImage =
      'https://cdn.imgbin.com/8/20/17/imgbin-computer-icons-button-check-mark-cross-red-cross-red-and-white-x-logo-V6upwmhHqRk2uDx6mmmqy7LdE.jpg';
    return (
      <components.MultiValueLabel {...props}>
        {
          <div style={{ padding: '4px' }}>
            <div
              className="multiSelectedData"
              style={{
                backgroundImage: `url(${content.icon})`,
                height: '30px',
                width: '30px',
                backgroundSize: 'cover',
                borderRadius: '5px',
                position: 'relative',
                // overflow: "hidden"
              }}
            >
              <div
                style={{
                  backgroundImage: `url(${content.store_icon})`,
                  // background:"white",
                  height: '15px',
                  width: '15px',
                  backgroundSize: 'cover',
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                }}
              ></div>
              <components.MultiValueRemove>
                <div
                  onClick={props.removeProps.onClick}
                  style={{
                    backgroundImage: `url(${crossbuttonImage})`,
                    // background:"white",
                    height: '15px',
                    width: '15px',
                    backgroundSize: 'cover',
                    position: 'absolute',
                    top: '0',
                    right: '0',
                  }}
                ></div>
              </components.MultiValueRemove>
            </div>
          </div>
        }
      </components.MultiValueLabel>
    );
  };

  const [
    {
      source_list,
      selected_source,
      reviews_list,
      total_reviews,
      five_star_reviews,
      four_star_reviews,
      three_star_reviews,
      two_star_reviews,
      one_star_reviews,
      overall_score,
      loop_start_index,
      loop_end_index,
      loader,
      review_offset,
      stars_selected,
      summary_loader,
      source_list_array,
      all_stars,
    },
    setState,
  ] = useState({
    source_list: [],
    selected_source: null,
    reviews_list: [],
    total_reviews: 0,
    five_star_reviews: 0,
    four_star_reviews: 0,
    three_star_reviews: 0,
    two_star_reviews: 0,
    one_star_reviews: 0,
    overall_score: 0,
    loop_start_index: 0,
    loop_end_index: 9,
    loader: false,
    review_offset: 0,
    stars_selected: [1, 2, 3, 4, 5],
    summary_loader: false,
    source_list_array: [],
    all_stars: [1, 2, 3, 4, 5],
  });
  const spinner = <Loader color="#ffffff" type="line-scale" />;
  const onStarsSelection = (e) => {
    var starSelected = parseInt(e.target.dataset.stars);
    var selected_stars_arr = stars_selected;
    console.log(selected_stars_arr);

    if (selected_stars_arr.includes(starSelected)) {
      var findIndex = selected_stars_arr.findIndex((a) => a == starSelected);

      findIndex !== -1 && selected_stars_arr.splice(findIndex, 1);
    } else {
      selected_stars_arr.push(starSelected);
    }
    console.log(selected_stars_arr);
    setState((prevState) => ({
      ...prevState,
      stars_selected: selected_stars_arr,
    }));
  };

  const contentBoxStyle = {
    backgroundColor: 'white',
    position: 'relative',
    padding: 20,
    border: '1px solid lightgrey',
    borderRadius: '5px',
  };
  const options = [
    { value: 'ON', label: 'On' },
    { value: 'OFF', label: 'Off' },
    { value: 'CONTINUOUS', label: 'Continuous' },
    { value: 'DAILY', label: 'Daily' },
    { value: 'DAILY-DIGEST', label: 'Daily Digest' },
  ];

  const getReviews = () => {
    getReviewSummaryOfApp();
    getReviewsOfApp();
  };

  const startLoading = () => {
    setState((prevState) => ({
      ...prevState,
      loader: true,
    }));
  };
  const stopLoading = () => {
    setState((prevState) => ({
      ...prevState,
      loader: false,
    }));
  };

  const startSummaryLoading = () => {
    setState((prevState) => ({
      ...prevState,
      summary_loader: true,
    }));
  };
  const stopSummaryLoading = () => {
    setState((prevState) => ({
      ...prevState,
      summary_loader: false,
    }));
  };

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;

      console.log(scrollTop, clientHeight, scrollHeight, Math.abs(scrollTop + clientHeight - scrollHeight));

      if (scrollTop + clientHeight === scrollHeight || Math.abs(scrollTop + clientHeight - scrollHeight) <= 10) {
        console.log('reached bottom');

        // if(loop_end_index == (parseInt(reviews_list?.length) - 1)){
        //     return;
        // }

        var new_loop_end_index = loop_end_index + 10;
        var new_loop_start_index = loop_end_index + 1;

        // if(reviews_list?.length <= new_loop_end_index){
        //     new_loop_end_index = parseInt(reviews_list?.length) - 1;
        // }
        console.log(new_loop_start_index, new_loop_end_index, reviews_list.length, reviews_list);

        setState((prevState) => ({
          ...prevState,
          loop_start_index: new_loop_start_index,
          loop_end_index: new_loop_end_index,
          loader: true,
          review_offset: new_loop_end_index,
        }));

        getReviewsOfAppPaginated();
      }
    }
  };

  useEffect(() => {
    getAllSourceAdded();
  }, []);

  const getReviewSummaryOfApp = (e = false) => {
    startSummaryLoading();
    var req = {};
    if (e) {
      req = {
        app_bundle_id: e.value,
        store_type: e.store_type,
        start_date: moment(new Date(date_range_value[0])).format('YYYY-MM-DD'),
        end_date: moment(new Date(date_range_value[1])).format('YYYY-MM-DD'),
        offset: review_offset,
        stars: stars_selected.join(','),
      };
    } else {
      var selectedSourceText = [];
      var selectedSourceType = [];
      source_list_array.forEach((elem, index) => {
        if (elem.is_checked == true) {
          selectedSourceText.push(elem.app_bundle_id);
          selectedSourceType.push(elem.store_type);
        }
      });
      req = {
        app_bundle_id: selectedSourceText.join(','),
        store_type: selectedSourceType.join(','),
        start_date: moment(new Date(date_range_value[0])).format('YYYY-MM-DD'),
        end_date: moment(new Date(date_range_value[1])).format('YYYY-MM-DD'),
        offset: review_offset,
        stars: stars_selected.join(','),
      };
    }
    appService
      .getReviewSummaryOfAppFromPlayStore(req)
      .then((res) => {
        if (res.success == false) {
          alertService.throwError(res.error);
          return;
        } else {
          setState((prevState) => ({
            ...prevState,
            total_reviews: res.data.total_reviews,
            five_star_reviews: res.data.stars['5'],
            four_star_reviews: res.data.stars['4'],
            three_star_reviews: res.data.stars['3'],
            two_star_reviews: res.data.stars['2'],
            one_star_reviews: res.data.stars['1'],
            overall_score: res.data.overall_score,
          }));
        }
        stopSummaryLoading();
      })
      .catch((err) => {
        stopSummaryLoading();
        alertService.throwError(err);
      });
  };

  const getReviewsOfAppPaginated = (e = false) => {
    console.log('sxdgvb');

    startLoading();
    var req = {};
    if (e) {
      req = {
        app_bundle_id: e.value,
        store_type: e.store_type,
        start_date: moment(new Date(date_range_value[0])).format('YYYY-MM-DD'),
        end_date: moment(new Date(date_range_value[1])).format('YYYY-MM-DD'),
        offset: review_offset,
        stars: stars_selected.join(','),
      };
    } else {
      var selectedSourceText = [];
      var selectedSourceType = [];

      console.log(source_list_array);

      source_list_array.forEach((elem, index) => {
        if (elem.is_checked == true) {
          selectedSourceText.push(elem.app_bundle_id);
          selectedSourceType.push(elem.store_type);
        }
      });
      req = {
        app_bundle_id: selectedSourceText.join(','),
        store_type: selectedSourceType.join(','),
        start_date: moment(new Date(date_range_value[0])).format('YYYY-MM-DD'),
        end_date: moment(new Date(date_range_value[1])).format('YYYY-MM-DD'),
        offset: review_offset,
        stars: stars_selected.join(','),
      };
      console.log(req);
    }
    appService
      .getInhouseReviewsOfAppFromPlayStore(req)
      .then((res) => {
        if (res.success == false) {
          alertService.throwError(res.error);
          return;
        } else {
          var review_arr = reviews_list;

          res.data.forEach((elem, index) => {
            review_arr.push(elem);
          });

          setState((prevState) => ({
            ...prevState,
            reviews_list: review_arr,
          }));

          stopLoading();
        }
      })
      .catch((err) => {
        alertService.throwError(err);
      });
  };

  const getReviewsOfApp = (e = false) => {
    setState((prevState) => ({
      ...prevState,
      reviews_list: [],
    }));
    console.log(new Date(date_range_value[0]), new Date(date_range_value[1]));
    startLoading();
    var req = {};
    if (e) {
      req = {
        app_bundle_id: e.value,
        store_type: e.store_type,
        start_date: moment(new Date(date_range_value[0])).format('YYYY-MM-DD'),
        end_date: moment(new Date(date_range_value[1])).format('YYYY-MM-DD'),
        offset: review_offset,
        stars: stars_selected.join(','),
      };
    } else {
      var selectedSourceText = [];
      var selectedSourceType = [];
      source_list_array.forEach((elem, index) => {
        if (elem.is_checked == true) {
          selectedSourceText.push(elem.app_bundle_id);
          selectedSourceType.push(elem.store_type);
        }
      });
      req = {
        app_bundle_id: selectedSourceText.join(','),
        store_type: selectedSourceType.join(','),
        start_date: moment(new Date(date_range_value[0])).format('YYYY-MM-DD'),
        end_date: moment(new Date(date_range_value[1])).format('YYYY-MM-DD'),
        offset: review_offset,
        stars: stars_selected.join(','),
      };
    }
    appService
      .getInhouseReviewsOfAppFromPlayStore(req)
      .then((res) => {
        if (res.success == false) {
          alertService.throwError(res.error);
          return;
        } else {
          var review_arr = reviews_list;

          res.data.forEach((elem, index) => {
            review_arr.push(elem);
          });

          setState((prevState) => ({
            ...prevState,
            reviews_list: review_arr,
          }));

          stopLoading();
        }
      })
      .catch((err) => {
        alertService.throwError(err);
      });
  };

  const onSourceChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      selected_source: e,
    }));
    // getReviewsOfApp(e);
    // getReviewSummaryOfApp(e);
  };
  const customFilter = (option, searchText) => {
    if (option.data.name.toLowerCase().includes(searchText.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  };
  const getAllSourceAdded = () => {
    appService
      .getAllSourceUserWise()
      .then((res) => {
        if (res.success == true) {
          var source_list_option = [];
          res.data.forEach((elem, index) => {
            res.data[index].is_checked = false;
            var childjson = {
              value: elem.app_bundle_id,
              name: elem.app_title,
              store_type: elem.store_type,
              icon: elem.app_icon,
              store_icon:
                elem.store_type == 'ITUNES_APP_STORE'
                  ? 'https://img.icons8.com/cute-clipart/2x/apple-app-store.png'
                  : 'https://img.icons8.com/fluency/2x/google-play.png',
              label:
                elem.app_icon != '' ? (
                  <div
                    className={style.menuOption}
                    data-multi-select-option="true"
                    role="option"
                    aria-selected="true"
                    tabIndex="-1"
                  >
                    <div style={{ display: 'flex' }}>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                          padding: '0px 7px',
                        }}
                      >
                        <div className={cx(style.b_appicon, style.b_appicon__google, style.b_appicon__medium)}>
                          <img style={{ height: '35px', float: 'left' }} src={elem.app_icon} />
                        </div>
                      </div>
                      <div style={{ float: 'left' }} className={style.appNameDropDownMenuConatiner}>
                        <h4 className={cx(style.b_heading, style.b_heading__h4)}>{elem.app_title}</h4>
                        <span className={cx(style.b_platform, style.b_platform__ios)}>
                          {elem.store_type == 'ITUNES_APP_STORE' ? (
                            <>
                              <img
                                height="16"
                                width="16"
                                alt="App Store Icon"
                                src="https://img.icons8.com/cute-clipart/2x/apple-app-store.png"
                              ></img>{' '}
                              App Store
                            </>
                          ) : (
                            <>
                              <img
                                height="16"
                                width="16"
                                alt="Google Play icon"
                                src="https://img.icons8.com/fluency/2x/google-play.png"
                              ></img>{' '}
                              Google Play
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  elem.app_title
                ),
            };
            source_list_option.push(childjson);
          });

          setState((prevState) => ({
            ...prevState,
            source_list: source_list_option,
            source_list_array: res.data,
          }));
        } else {
          alertService.throwError(res.error);
        }
      })
      .catch((err) => {
        alertService.throwError(err);
      });
  };

  const manageSelection = (e) => {
    var selection = e?.target?.dataset?.id;
    var array = source_list_array;
    var indexOfElem = array.indexOf(array.find((item) => item._id == selection));

    array[indexOfElem].is_checked = !array[indexOfElem].is_checked;
    setState((prevState) => ({
      ...prevState,
      source_list_array: array,
    }));
  };

  return (
    <Fragment>
      <Row>
        <Col md="12">
          <p className={style.profleHeading}>Reviews</p>
          <p className={style.profleSubHeading}>
            View, search and get stats on reviews with text. <Link>Learn more</Link> →
          </p>
        </Col>
      </Row>
      <Row style={{ marginBottom: '10px' }}>
        <Col md="12">
          <Card>
            <CardHeader className={style.filterHeader}>
              <UncontrolledButtonDropdown className={style.filterHeaderDrpdwon}>
                <DropdownToggle color="link" className={style.customLink}>
                  Sources
                  <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown} />
                </DropdownToggle>
                <DropdownMenu justified left className={cx('rm-pointers dropdown-menu-xs', style.customDropdownMenu)}>
                  {source_list_array.map(function (elem, index) {
                    return (
                      <DropdownItem
                        toggle={false}
                        data-id={elem._id}
                        onClick={(e) => manageSelection(e)}
                        className={style.customSubMenu}
                      >
                        <div
                          data-id={elem._id}
                          className={style.menuOption}
                          data-multi-select-option="true"
                          role="option"
                          aria-selected="true"
                          tabIndex="-1"
                        >
                          <div data-id={elem._id} style={{ display: 'flex' }}>
                            <div data-id={elem._id} className={style.selectionCheckboxContainer}>
                              <input
                                data-id={elem._id}
                                checked={elem.is_checked == true ? true : false}
                                name="585753"
                                type="checkbox"
                                className={style.selectionCheckbox}
                              ></input>
                            </div>
                            <div
                              data-id={elem._id}
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                padding: '0px 7px',
                              }}
                            >
                              <div
                                data-id={elem._id}
                                className={cx(style.b_appicon, style.b_appicon__google, style.b_appicon__medium)}
                              >
                                <img style={{ height: '35px', float: 'left' }} src={elem.app_icon} />
                              </div>
                            </div>
                            <div
                              data-id={elem._id}
                              style={{ float: 'left' }}
                              className={style.appNameDropDownMenuConatiner}
                            >
                              <h4 data-id={elem._id} className={cx(style.b_heading, style.b_heading__h4)}>
                                {elem.app_title}
                              </h4>
                              <span data-id={elem._id} className={cx(style.b_platform, style.b_platform__ios)}>
                                {elem.store_type == 'ITUNES_APP_STORE' ? (
                                  <>
                                    <img
                                      height="16"
                                      width="16"
                                      alt="App Store Icon"
                                      src="https://img.icons8.com/cute-clipart/2x/apple-app-store.png"
                                    ></img>{' '}
                                    App Store
                                  </>
                                ) : (
                                  <>
                                    <img
                                      height="16"
                                      width="16"
                                      alt="Google Play icon"
                                      src="https://img.icons8.com/fluency/2x/google-play.png"
                                    ></img>{' '}
                                    Google Play
                                  </>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledButtonDropdown>
              <UncontrolledButtonDropdown className={style.filterHeaderDrpdwon}>
                <DropdownToggle color="link" className={style.customLink}>
                  Sources
                  <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown} />
                </DropdownToggle>
                <DropdownMenu justified left className={cx('rm-pointers dropdown-menu-xs', style.customDropdownMenu)}>
                  {source_list_array.map(function (elem, index) {
                    return (
                      <DropdownItem
                        toggle={false}
                        data-id={elem._id}
                        onClick={(e) => manageSelection(e)}
                        className={style.customSubMenu}
                      >
                        <div
                          data-id={elem._id}
                          className={style.menuOption}
                          data-multi-select-option="true"
                          role="option"
                          aria-selected="true"
                          tabIndex="-1"
                        >
                          <div data-id={elem._id} style={{ display: 'flex' }}>
                            <div data-id={elem._id} className={style.selectionCheckboxContainer}>
                              <input
                                data-id={elem._id}
                                checked={elem.is_checked == true ? true : false}
                                name="585753"
                                type="checkbox"
                                className={style.selectionCheckbox}
                              ></input>
                            </div>
                            <div
                              data-id={elem._id}
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                padding: '0px 7px',
                              }}
                            >
                              <div
                                data-id={elem._id}
                                className={cx(style.b_appicon, style.b_appicon__google, style.b_appicon__medium)}
                              >
                                <img style={{ height: '35px', float: 'left' }} src={elem.app_icon} />
                              </div>
                            </div>
                            <div
                              data-id={elem._id}
                              style={{ float: 'left' }}
                              className={style.appNameDropDownMenuConatiner}
                            >
                              <h4 data-id={elem._id} className={cx(style.b_heading, style.b_heading__h4)}>
                                {elem.app_title}
                              </h4>
                              <span data-id={elem._id} className={cx(style.b_platform, style.b_platform__ios)}>
                                {elem.store_type == 'ITUNES_APP_STORE' ? (
                                  <>
                                    <img
                                      height="16"
                                      width="16"
                                      alt="App Store Icon"
                                      src="https://img.icons8.com/cute-clipart/2x/apple-app-store.png"
                                    ></img>{' '}
                                    App Store
                                  </>
                                ) : (
                                  <>
                                    <img
                                      height="16"
                                      width="16"
                                      alt="Google Play icon"
                                      src="https://img.icons8.com/fluency/2x/google-play.png"
                                    ></img>{' '}
                                    Google Play
                                  </>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledButtonDropdown>
              <UncontrolledButtonDropdown className={style.filterHeaderDrpdwon}>
                <DropdownToggle color="link" className={style.customLink}>
                  Keyword
                  <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown} />
                </DropdownToggle>
                <DropdownMenu justified left className="rm-pointers dropdown-menu-xs">
                  <DropdownItem toggle={false} className={style.customSubMenu}>
                    <Input type="text"></Input>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
              <UncontrolledButtonDropdown className={style.filterHeaderDrpdwon}>
                <DropdownToggle color="link" className={style.customLink}>
                  Stars
                  <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown} />
                </DropdownToggle>
                <DropdownMenu left>
                  {all_stars.map(function (elem, index) {
                    return (
                      <DropdownItem toggle={false} className={style.customDropdownMenuforstars}>
                        <Input
                          onClick={(e) => onStarsSelection(e)}
                          data-stars={elem}
                          checked={stars_selected.includes(elem) ? true : false}
                          type="checkbox"
                        />{' '}
                        <StarRatings
                          rating={elem}
                          starRatedColor="rgb(243, 182, 54)"
                          numberOfStars={5}
                          name="rating"
                          starDimension="18px"
                          starSpacing="0px"
                        />
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledButtonDropdown>
              <UncontrolledButtonDropdown className={style.filterHeaderDrpdwon}>
                <DropdownToggle color="link" className={style.customLink}>
                  Sentiments
                  <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown} />
                </DropdownToggle>
                <DropdownMenu justified left className="rm-pointers dropdown-menu-xs">
                  <DropdownItem toggle={false}>
                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" /> <span style={{ fontWeight: '600', color: 'green' }}>Positive</span>
                      </Label>
                    </FormGroup>
                  </DropdownItem>
                  <DropdownItem>
                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" />{' '}
                        <span style={{ fontWeight: '600', color: 'rgb(255, 158, 0)' }}>Neutral</span>
                      </Label>
                    </FormGroup>
                  </DropdownItem>
                  <DropdownItem>
                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" />{' '}
                        <span style={{ fontWeight: '600', color: 'rgb(230, 64, 58)' }}>Negative</span>
                      </Label>
                    </FormGroup>
                  </DropdownItem>
                  <DropdownItem>
                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" />{' '}
                        <span style={{ fontWeight: '600', color: 'rgb(114, 141, 163)' }}>Mixed</span>
                      </Label>
                    </FormGroup>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
              <UncontrolledButtonDropdown className={style.filterHeaderDrpdwon}>
                <DropdownToggle color="link" className={style.customLink}>
                  Language
                  <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown} />
                </DropdownToggle>
                <DropdownMenu justified left className="rm-pointers dropdown-menu-xs">
                  {source_list_array.map(function (elem, index) {
                    return (
                      <DropdownItem className={style.customSubMenu}>
                        <div
                          className={style.menuOption}
                          data-multi-select-option="true"
                          role="option"
                          aria-selected="true"
                          tabIndex="-1"
                        >
                          <div style={{ display: 'flex' }}>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                padding: '0px 7px',
                              }}
                            >
                              <div className={cx(style.b_appicon, style.b_appicon__google, style.b_appicon__medium)}>
                                <img style={{ height: '35px', float: 'left' }} src={elem.app_icon} />
                              </div>
                            </div>
                            <div style={{ float: 'left' }} className={style.appNameDropDownMenuConatiner}>
                              <h4 className={cx(style.b_heading, style.b_heading__h4)}>{elem.app_title}</h4>
                              <span className={cx(style.b_platform, style.b_platform__ios)}>
                                {elem.store_type == 'ITUNES_APP_STORE' ? (
                                  <>
                                    <img
                                      height="16"
                                      width="16"
                                      alt="App Store Icon"
                                      src="https://img.icons8.com/cute-clipart/2x/apple-app-store.png"
                                    ></img>{' '}
                                    App Store
                                  </>
                                ) : (
                                  <>
                                    <img
                                      height="16"
                                      width="16"
                                      alt="Google Play icon"
                                      src="https://img.icons8.com/fluency/2x/google-play.png"
                                    ></img>{' '}
                                    Google Play
                                  </>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledButtonDropdown>
              <UncontrolledButtonDropdown className={style.filterHeaderDrpdwon}>
                <DropdownToggle color="link" className={style.customLink}>
                  Topics & Tags
                  <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown} />
                </DropdownToggle>
                <DropdownMenu justified left className="rm-pointers dropdown-menu-xs">
                  {source_list_array.map(function (elem, index) {
                    return (
                      <DropdownItem className={style.customSubMenu}>
                        <div
                          className={style.menuOption}
                          data-multi-select-option="true"
                          role="option"
                          aria-selected="true"
                          tabIndex="-1"
                        >
                          <div style={{ display: 'flex' }}>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                padding: '0px 7px',
                              }}
                            >
                              <div className={cx(style.b_appicon, style.b_appicon__google, style.b_appicon__medium)}>
                                <img style={{ height: '35px', float: 'left' }} src={elem.app_icon} />
                              </div>
                            </div>
                            <div style={{ float: 'left' }} className={style.appNameDropDownMenuConatiner}>
                              <h4 className={cx(style.b_heading, style.b_heading__h4)}>{elem.app_title}</h4>
                              <span className={cx(style.b_platform, style.b_platform__ios)}>
                                {elem.store_type == 'ITUNES_APP_STORE' ? (
                                  <>
                                    <img
                                      height="16"
                                      width="16"
                                      alt="App Store Icon"
                                      src="https://img.icons8.com/cute-clipart/2x/apple-app-store.png"
                                    ></img>{' '}
                                    App Store
                                  </>
                                ) : (
                                  <>
                                    <img
                                      height="16"
                                      width="16"
                                      alt="Google Play icon"
                                      src="https://img.icons8.com/fluency/2x/google-play.png"
                                    ></img>{' '}
                                    Google Play
                                  </>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledButtonDropdown>
              <UncontrolledButtonDropdown className={style.filterHeaderDrpdwon}>
                <DropdownToggle color="link" className={style.customLink}>
                  Replied To
                  <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown} />
                </DropdownToggle>
                <DropdownMenu justified left className="rm-pointers dropdown-menu-xs">
                  {source_list_array.map(function (elem, index) {
                    return (
                      <DropdownItem className={style.customSubMenu}>
                        <div
                          className={style.menuOption}
                          data-multi-select-option="true"
                          role="option"
                          aria-selected="true"
                          tabIndex="-1"
                        >
                          <div style={{ display: 'flex' }}>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                padding: '0px 7px',
                              }}
                            >
                              <div className={cx(style.b_appicon, style.b_appicon__google, style.b_appicon__medium)}>
                                <img style={{ height: '35px', float: 'left' }} src={elem.app_icon} />
                              </div>
                            </div>
                            <div style={{ float: 'left' }} className={style.appNameDropDownMenuConatiner}>
                              <h4 className={cx(style.b_heading, style.b_heading__h4)}>{elem.app_title}</h4>
                              <span className={cx(style.b_platform, style.b_platform__ios)}>
                                {elem.store_type == 'ITUNES_APP_STORE' ? (
                                  <>
                                    <img
                                      height="16"
                                      width="16"
                                      alt="App Store Icon"
                                      src="https://img.icons8.com/cute-clipart/2x/apple-app-store.png"
                                    ></img>{' '}
                                    App Store
                                  </>
                                ) : (
                                  <>
                                    <img
                                      height="16"
                                      width="16"
                                      alt="Google Play icon"
                                      src="https://img.icons8.com/fluency/2x/google-play.png"
                                    ></img>{' '}
                                    Google Play
                                  </>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledButtonDropdown>
              <div style={{ float: 'right' }}>
                <Button variant="dark" onClick={() => getReviews()}>
                  Get Reviews
                </Button>
              </div>
            </CardHeader>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader className={style.customCardHeader}>
              <span className={style.statsBold}>Stats</span>
              &nbsp;
              <span className={style.headingDesc}>Not matching the public store? You're probably looking for</span>
              &nbsp;
              <Link className={style.customLink}>Ratings</Link>
            </CardHeader>
            <LoaderAdv message={spinner} show={summary_loader} priority={5}>
              <CardBody>
                <div className={style.reviewStats}>
                  <div className={style.reviewStatContainer}>
                    <div className={style.reviewStatLabel}>
                      Reviews
                      <a data-tip data-for="review_tooltip">
                        <svg width="16" height="16" viewBox="0 0 16 16" className={cx(style.iIcon, style.sLeftSmall)}>
                          <path d="M8 15c-3.85 0-7-3.15-7-7s3.15-7 7-7 7 3.15 7 7-3.15 7-7 7zm0-1c3.298 0 6-2.702 6-6s-2.702-6-6-6-6 2.702-6 6 2.702 6 6 6zm0-3.667c-.35 0-.583-.233-.583-.583v-.408c0-.875.466-1.634 1.166-2.042.467-.233.7-.758.584-1.225a1.114 1.114 0 00-.934-.933c-.35-.059-.7 0-.991.233-.234.175-.409.525-.409.875s-.233.583-.583.583-.583-.233-.583-.583c0-.7.291-1.342.816-1.808.525-.467 1.225-.642 1.925-.525a2.367 2.367 0 011.867 1.866c.175.992-.292 1.984-1.167 2.45-.35.175-.525.584-.525 1.05v.467c0 .35-.233.583-.583.583zm0 2.042a.897.897 0 01-.875-.875c0-.467.408-.875.875-.875s.875.408.875.875a.897.897 0 01-.875.875z"></path>
                        </svg>
                      </a>
                      <ReactTooltip place="right" id="review_tooltip" effect="solid" aria-haspopup="true">
                        Count of reviews with text. For overall ratings head to Ratings in the left menu
                      </ReactTooltip>
                    </div>

                    <div className={style.reviewStatBody}>
                      <CountUp
                        start={0}
                        end={total_reviews}
                        separator=","
                        decimals={0}
                        decimal=""
                        prefix=""
                        duration="5"
                      />
                      <span className={style.countSubheading}>For selected range</span>
                    </div>
                  </div>
                  <div className={style.reviewStatContainer}>
                    <div className={style.reviewStatLabel}>
                      Avg Stars
                      <a data-tip data-for="avg_stars">
                        <svg width="16" height="16" viewBox="0 0 16 16" className={cx(style.iIcon, style.sLeftSmall)}>
                          <path d="M8 15c-3.85 0-7-3.15-7-7s3.15-7 7-7 7 3.15 7 7-3.15 7-7 7zm0-1c3.298 0 6-2.702 6-6s-2.702-6-6-6-6 2.702-6 6 2.702 6 6 6zm0-3.667c-.35 0-.583-.233-.583-.583v-.408c0-.875.466-1.634 1.166-2.042.467-.233.7-.758.584-1.225a1.114 1.114 0 00-.934-.933c-.35-.059-.7 0-.991.233-.234.175-.409.525-.409.875s-.233.583-.583.583-.583-.233-.583-.583c0-.7.291-1.342.816-1.808.525-.467 1.225-.642 1.925-.525a2.367 2.367 0 011.867 1.866c.175.992-.292 1.984-1.167 2.45-.35.175-.525.584-.525 1.05v.467c0 .35-.233.583-.583.583zm0 2.042a.897.897 0 01-.875-.875c0-.467.408-.875.875-.875s.875.408.875.875a.897.897 0 01-.875.875z"></path>
                        </svg>
                      </a>
                      <ReactTooltip place="right" id="avg_stars" effect="solid" aria-haspopup="true">
                        Average star rating from reviews with text. For overall ratings head to Ratings in the left menu
                      </ReactTooltip>
                    </div>
                    <div className={style.reviewStatBody}>
                      <StarRatings
                        rating={overall_score}
                        starRatedColor="rgb(243, 182, 54)"
                        numberOfStars={5}
                        name="rating"
                        starDimension="30px"
                        starSpacing="0px"
                      />
                      <span className={style.countSubheading}>{overall_score} Stars</span>
                    </div>
                  </div>
                  <div className={style.reviewStatContainer}>
                    <div className={style.reviewStatLabel}>
                      Stars Breakdown
                      <a data-tip data-for="stars_brkdwn">
                        <svg width="16" height="16" viewBox="0 0 16 16" className={cx(style.iIcon, style.sLeftSmall)}>
                          <path d="M8 15c-3.85 0-7-3.15-7-7s3.15-7 7-7 7 3.15 7 7-3.15 7-7 7zm0-1c3.298 0 6-2.702 6-6s-2.702-6-6-6-6 2.702-6 6 2.702 6 6 6zm0-3.667c-.35 0-.583-.233-.583-.583v-.408c0-.875.466-1.634 1.166-2.042.467-.233.7-.758.584-1.225a1.114 1.114 0 00-.934-.933c-.35-.059-.7 0-.991.233-.234.175-.409.525-.409.875s-.233.583-.583.583-.583-.233-.583-.583c0-.7.291-1.342.816-1.808.525-.467 1.225-.642 1.925-.525a2.367 2.367 0 011.867 1.866c.175.992-.292 1.984-1.167 2.45-.35.175-.525.584-.525 1.05v.467c0 .35-.233.583-.583.583zm0 2.042a.897.897 0 01-.875-.875c0-.467.408-.875.875-.875s.875.408.875.875a.897.897 0 01-.875.875z"></path>
                        </svg>
                      </a>
                      <ReactTooltip place="right" id="stars_brkdwn" effect="solid" aria-haspopup="true">
                        Breakdown of all star ratings with a review during this period.
                      </ReactTooltip>
                    </div>
                    <div className={style.reviewStatBody}>
                      <div className={cx('widget-progress-wrapper', style.progessWidgetContainerForStarBifurcation)}>
                        <Progress
                          className={cx(
                            'progress-bar-sm progress-bar-animated-alt',
                            style.customProgessBar,
                            style.progessBarForStartBifurcation
                          )}
                          color="warning"
                          value={
                            (five_star_reviews /
                              (five_star_reviews +
                                four_star_reviews +
                                three_star_reviews +
                                two_star_reviews +
                                one_star_reviews)) *
                            100
                          }
                        />
                        <div className={cx('progress-sub-label', style.customProgessSubLabel)}>
                          <div className={cx('sub-label-left', style.customSubLevelLeft)}>
                            <FontAwesomeIcon style={{ color: '#d5d5d5' }} icon={faStar} />5
                            <span className={style.customSubLevelRight}>{five_star_reviews}</span>
                          </div>
                        </div>
                      </div>
                      <div className={cx('widget-progress-wrapper', style.progessWidgetContainerForStarBifurcation)}>
                        <Progress
                          className={cx(
                            'progress-bar-sm progress-bar-animated-alt',
                            style.customProgessBar,
                            style.progessBarForStartBifurcation
                          )}
                          color="warning"
                          value={
                            (four_star_reviews /
                              (five_star_reviews +
                                four_star_reviews +
                                three_star_reviews +
                                two_star_reviews +
                                one_star_reviews)) *
                            100
                          }
                        />
                        <div className={cx('progress-sub-label', style.customProgessSubLabel)}>
                          <div className={cx('sub-label-left', style.customSubLevelLeft)}>
                            <FontAwesomeIcon style={{ color: '#d5d5d5' }} icon={faStar} />4
                            <span className={style.customSubLevelRight}>{four_star_reviews}</span>
                          </div>
                        </div>
                      </div>
                      <div className={cx('widget-progress-wrapper', style.progessWidgetContainerForStarBifurcation)}>
                        <Progress
                          className={cx(
                            'progress-bar-sm progress-bar-animated-alt',
                            style.customProgessBar,
                            style.progessBarForStartBifurcation
                          )}
                          color="warning"
                          value={
                            (three_star_reviews /
                              (five_star_reviews +
                                four_star_reviews +
                                three_star_reviews +
                                two_star_reviews +
                                one_star_reviews)) *
                            100
                          }
                        />
                        <div className={cx('progress-sub-label', style.customProgessSubLabel)}>
                          <div className={cx('sub-label-left', style.customSubLevelLeft)}>
                            <FontAwesomeIcon style={{ color: '#d5d5d5' }} icon={faStar} />3
                            <span className={style.customSubLevelRight}>{three_star_reviews}</span>
                          </div>
                        </div>
                      </div>
                      <div className={cx('widget-progress-wrapper', style.progessWidgetContainerForStarBifurcation)}>
                        <Progress
                          className={cx(
                            'progress-bar-sm progress-bar-animated-alt',
                            style.customProgessBar,
                            style.progessBarForStartBifurcation
                          )}
                          color="warning"
                          value={
                            (two_star_reviews /
                              (five_star_reviews +
                                four_star_reviews +
                                three_star_reviews +
                                two_star_reviews +
                                one_star_reviews)) *
                            100
                          }
                        />
                        <div className={cx('progress-sub-label', style.customProgessSubLabel)}>
                          <div className={cx('sub-label-left', style.customSubLevelLeft)}>
                            <FontAwesomeIcon style={{ color: '#d5d5d5' }} icon={faStar} />2
                            <span className={style.customSubLevelRight}>{two_star_reviews}</span>
                          </div>
                        </div>
                      </div>
                      <div className={cx('widget-progress-wrapper', style.progessWidgetContainerForStarBifurcation)}>
                        <Progress
                          className={cx(
                            'progress-bar-sm progress-bar-animated-alt',
                            style.customProgessBar,
                            style.progessBarForStartBifurcation
                          )}
                          color="warning"
                          value={
                            (one_star_reviews /
                              (five_star_reviews +
                                four_star_reviews +
                                three_star_reviews +
                                two_star_reviews +
                                one_star_reviews)) *
                            100
                          }
                        />
                        <div className={cx('progress-sub-label', style.customProgessSubLabel)}>
                          <div className={cx('sub-label-left', style.customSubLevelLeft)}>
                            <FontAwesomeIcon style={{ color: '#d5d5d5' }} icon={faStar} />1
                            <span className={style.customSubLevelRight}>{one_star_reviews}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={cx(style.reviewStatContainer, style.reviewStatContainerlast)}>
                    <div className={style.reviewStatLabel}>
                      Sentiment Breakdown
                      <a data-tip data-for="sentiment_brkdwn">
                        <svg width="16" height="16" viewBox="0 0 16 16" className={cx(style.iIcon, style.sLeftSmall)}>
                          <path d="M8 15c-3.85 0-7-3.15-7-7s3.15-7 7-7 7 3.15 7 7-3.15 7-7 7zm0-1c3.298 0 6-2.702 6-6s-2.702-6-6-6-6 2.702-6 6 2.702 6 6 6zm0-3.667c-.35 0-.583-.233-.583-.583v-.408c0-.875.466-1.634 1.166-2.042.467-.233.7-.758.584-1.225a1.114 1.114 0 00-.934-.933c-.35-.059-.7 0-.991.233-.234.175-.409.525-.409.875s-.233.583-.583.583-.583-.233-.583-.583c0-.7.291-1.342.816-1.808.525-.467 1.225-.642 1.925-.525a2.367 2.367 0 011.867 1.866c.175.992-.292 1.984-1.167 2.45-.35.175-.525.584-.525 1.05v.467c0 .35-.233.583-.583.583zm0 2.042a.897.897 0 01-.875-.875c0-.467.408-.875.875-.875s.875.408.875.875a.897.897 0 01-.875.875z"></path>
                        </svg>
                      </a>
                      <ReactTooltip place="right" id="sentiment_brkdwn" effect="solid" aria-haspopup="true">
                        Breakdown of all star ratings with a review during this period.
                      </ReactTooltip>
                    </div>
                    <div className={style.reviewStatBody}>
                      <div className={cx('widget-progress-wrapper', style.progessWidgetContainerForSentimentReview)}>
                        <Progress
                          animated
                          className={cx(
                            'progress-bar-sm progress-bar-animated-alt',
                            style.customProgessBar,
                            style.progessBarForStartBifurcation
                          )}
                          color="success"
                          value="10"
                        />
                        <div className={cx('progress-sub-label', style.customProgessSubLabel)}>
                          <div className={cx('sub-label-left', style.customSubLevelLeft)}>
                            Positive
                            <span className={style.customSubLevelRight}>23(10%)</span>
                          </div>
                        </div>
                      </div>
                      <div className={cx('widget-progress-wrapper', style.progessWidgetContainerForSentimentReview)}>
                        <Progress
                          animated
                          className={cx(
                            'progress-bar-sm progress-bar-animated-alt',
                            style.customProgessBar,
                            style.progessBarForStartBifurcation
                          )}
                          color="warning"
                          value="36"
                        />
                        <div className={cx('progress-sub-label', style.customProgessSubLabel)}>
                          <div className={cx('sub-label-left', style.customSubLevelLeft)}>
                            Neutral
                            <span className={style.customSubLevelRight}>85(36%)</span>
                          </div>
                        </div>
                      </div>
                      <div className={cx('widget-progress-wrapper', style.progessWidgetContainerForSentimentReview)}>
                        <Progress
                          animated
                          className={cx(
                            'progress-bar-sm progress-bar-animated-alt',
                            style.customProgessBar,
                            style.progessBarForStartBifurcation
                          )}
                          color="info"
                          value="55"
                        />
                        <div className={cx('progress-sub-label', style.customProgessSubLabel)}>
                          <div className={cx('sub-label-left', style.customSubLevelLeft)}>
                            <FontAwesomeIcon style={{ color: '#d5d5d5' }} icon={faStar} />
                            Mixed
                            <span className={style.customSubLevelRight}>85(55%)</span>
                          </div>
                        </div>
                      </div>
                      <div className={cx('widget-progress-wrapper', style.progessWidgetContainerForSentimentReview)}>
                        <Progress
                          animated
                          className={cx(
                            'progress-bar-sm progress-bar-animated-alt',
                            style.customProgessBar,
                            style.progessBarForStartBifurcation
                          )}
                          color="danger"
                          value="97"
                        />
                        <div className={cx('progress-sub-label', style.customProgessSubLabel)}>
                          <div className={cx('sub-label-left', style.customSubLevelLeft)}>
                            Negative
                            <span className={style.customSubLevelRight}>85(97%)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </LoaderAdv>
          </Card>
          <div style={{ height: '500px', overflowY: 'auto', marginTop: '10px' }} onScroll={onScroll} ref={listInnerRef}>
            {reviews_list &&
              reviews_list.length > 0 &&
              reviews_list.map(function (object, i) {
                // startLoading();
                // if(i == (parseInt(reviews_list.length) - 1) || (i == parseInt(loop_end_index)) ){
                //     stopLoading();
                // }

                // if(i >= loop_start_index && i <= loop_end_index){
                return (
                  <div className={style.reviewWrapper}>
                    <div className={style.reviewBody}>
                      <span className={style.reviewRatingStars}>
                        <StarRatings
                          rating={parseInt(object.review_score)}
                          starRatedColor="rgb(243, 182, 54)"
                          numberOfStars={5}
                          name="rating"
                          starDimension="15px"
                          starSpacing="0px"
                        />
                      </span>
                      <h3
                        className={cx(style.bHeading, style.bHeadingH2, style.sTopMedium)}
                        style={{ whiteSpace: 'pre-line', fontWeight: '600' }}
                      >
                        <span>{object.review_title && object.review_title != null ? object.review_title : ''}</span>
                      </h3>
                      <p
                        className={cx(style.bParagraph, style.tTable__rowGrow, style.sTopMedium)}
                        style={{ whiteSpace: 'pre-line' }}
                      >
                        <span>{object.review_text && object.review_text != null ? object.review_text : ''}</span>
                      </p>

                      <div className={cx(style.review__actions, style.bTag)}>
                        <div className={style.a__left}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            <div>{moment(object.review_date).format('MMMM Do YYYY, h:mm:ss a')}</div>
                            <span>
                              <span
                                className={cx(style.s_left__small, style.s_right__small)}
                                style={{ color: 'rgb(220, 220, 220)' }}
                              >
                                •
                              </span>
                              <a
                                className={cx(style.b_link, style.b_link__light)}
                                href="/reviews/2818609266_75940/?app=75940&amp;start=2022-02-24&amp;end=2022-05-25"
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  className={cx(
                                    style.iIcon,
                                    style.i_icon,
                                    style.i_icon__grey,
                                    style.i_icon__xsmall,
                                    style.s_right__small
                                  )}
                                >
                                  <path
                                    d="M13.263 12.016c-.012-.128-.398-3.243-5.65-3.24v1.992a.346.346 0 01-.215.314.398.398 0 01-.398-.046L2.137 7.308A.337.337 0 012 7.04c0-.104.051-.203.138-.268l4.863-3.693a.4.4 0 01.397-.045c.131.058.215.18.215.313v1.949c2.179.064 3.878.712 4.972 1.897 1.78 1.928 1.383 4.73 1.365 4.846a.343.343 0 01-.348.295.333.333 0 01-.339-.317z"
                                    fillRule="evenodd"
                                  ></path>
                                </svg>
                                <span>Reply to Review</span>
                              </a>
                            </span>
                            <span>
                              <span
                                className={cx(style.s_left__small, style.s_right__small)}
                                style={{ color: 'rgb(220, 220, 220)' }}
                              >
                                •
                              </span>
                              <a
                                className={cx(style.b_link, style.b_link__light)}
                                href="/apps/75940-ola-the-top-ride-hailing-app/reviews/2818609266/external_reply"
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  className={cx(
                                    style.iIcon,
                                    style.i_icon,
                                    style.i_icon__grey,
                                    style.i_icon__xsmall,
                                    style.s_right__small
                                  )}
                                >
                                  <path d="M14.17 2.698v4.564a.5.5 0 001 .026V1.513A.5.5 0 0014.657 1H8.824a.5.5 0 10.027 1h4.603l-8.32 8.137c-.162.163-.195.512 0 .707.196.196.545.163.708 0l8.328-8.146z"></path>
                                  <path d="M2.5 4.5v9h9V7.016a.5.5 0 011 0V14a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V4a.5.5 0 01.5-.5h6.98a.5.5 0 010 1H2.5z"></path>
                                </svg>
                                <span>Reply in Console</span>
                              </a>
                            </span>
                          </div>
                        </div>
                        <div className={style.a_right}>
                          <div>
                            <span
                              aria-label="Too expensive share menu"
                              className="review-action"
                              data-review-share-actions-callout="true"
                            >
                              <span
                                className={cx(
                                  style.b_button,
                                  style.b_button__tiny,
                                  style.b_button__clean,
                                  style.b_tooltipped,
                                  style.b_tooltipped__top,
                                  style.b_tooltipped__nodelay
                                )}
                                aria-label="Options"
                              >
                                <svg width="16" height="16" viewBox="0 0 16 16" className={style.iIcon}>
                                  <path d="M4.707 6.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 10-1.414-1.414L8 9.586 4.707 6.293z"></path>
                                </svg>
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={style.review__meta}>
                      <div className={style.meta_row}>
                        <div style={{ float: 'left' }} className={style.meta__heading}>
                          Author
                        </div>
                        <div style={{ float: 'left' }}>
                          <a
                            className={cx(style.b_link, style.b_link__light)}
                            href='https://www.google.com/search?q=+"rawzeeee" twitter OR facebook OR linkedin OR email OR @"rawzeeee"'
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <span
                              style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '170px',
                              }}
                            >
                              <span>
                                {object.review_user_name && object.review_user_name != null
                                  ? object.review_user_name
                                  : ''}
                              </span>
                            </span>
                            <div>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                className={cx(
                                  style.iIcon,
                                  style.i_icon,
                                  style.i_icon__grey,
                                  style.i_icon__xsmall,
                                  style.s_right__small
                                )}
                              >
                                <path d="M14.17 2.698v4.564a.5.5 0 001 .026V1.513A.5.5 0 0014.657 1H8.824a.5.5 0 10.027 1h4.603l-8.32 8.137c-.162.163-.195.512 0 .707.196.196.545.163.708 0l8.328-8.146z"></path>
                                <path d="M2.5 4.5v9h9V7.016a.5.5 0 011 0V14a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V4a.5.5 0 01.5-.5h6.98a.5.5 0 010 1H2.5z"></path>
                              </svg>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className={style.meta_row}>
                        <div style={{ float: 'left' }} className={style.meta__heading}>
                          Location
                        </div>
                        <div style={{ float: 'left' }}>
                          <span>India</span>
                        </div>
                      </div>
                      <div className={style.meta_row}>
                        <div style={{ float: 'left' }} className={style.meta__heading}>
                          Language
                        </div>
                        <span style={{ float: 'left' }}>English</span>
                      </div>
                      <div className={style.meta_row}>
                        <div style={{ float: 'left' }} className={style.meta__heading}>
                          Version
                        </div>
                        <div style={{ float: 'left' }}>
                          {object.review_on_app_version && object.review_on_app_version != null
                            ? object.review_on_app_version
                            : ''}
                        </div>
                      </div>
                      <div className={style.meta_row}>
                        <div style={{ float: 'left' }} className={style.meta__heading}>
                          Sentiment
                        </div>
                        <div style={{ float: 'left' }}>
                          <div
                            style={{
                              color: 'rgb(230, 64, 58)',
                              backgroundColor: 'rgb(255, 241, 241)',
                              padding: '0px 4px',
                              borderRadius: '4px',
                            }}
                          >
                            Negative
                          </div>
                        </div>
                      </div>
                      <div className={cx(style.meta__row, style.meta__tagwrapper)}>
                        <div className={style.meta__heading} style={{ paddingTop: '4px', float: 'left' }}>
                          Topics
                        </div>
                        <div className={cx(style.b_tag_wrapper, style.review_topics)}>
                          <div className={style.b_tag_wrapper}>
                            <a href="?topic=14" className={style.b_topic}>
                              Connectivity
                            </a>
                            <a href="?topic=18" className={style.b_topic}>
                              Frequency
                            </a>
                            <a href="?topic=19" className={style.b_topic}>
                              Dissatisfied users
                            </a>
                            <a href="?topic=30" className={style.b_topic}>
                              Payment
                            </a>
                            <a href="?topic=32" className={style.b_topic}>
                              Privacy
                            </a>
                          </div>
                          <div className={cx(style.bTag, style.b_link, style.b_link__light)}>+ 1 More Topic</div>
                        </div>
                      </div>
                      <div className={cx(style.meta__row, style.meta__tagwrapper)} style={{ paddingTop: '4px' }}>
                        <div className={style.meta__heading}>Cust Topics</div>
                        <div className={cx(style.b_tag_wrapper, style.review_topics)}>
                          <a href="/custom_topics/new" className={style.b_tag__button}>
                            + Create
                          </a>
                        </div>
                      </div>
                      <div className={cx(style.meta__row, style.meta__tagwrapper)}>
                        <div className={style.meta__heading} style={{ paddingTop: '7px' }}>
                          Tags
                        </div>
                        <div className={cx(style.b_tag_wrapper, style.review_topics)}>
                          <div className={style.css_1o8xjgl_container}>
                            <span id="react-select-4-live-region" className={style.css_7pg0cj_a11yText}></span>
                            <span
                              aria-live="polite"
                              aria-atomic="false"
                              aria-relevant="additions text"
                              className={style.css_7pg0cj_a11yText}
                            ></span>
                            <div className={style.css_usw0b3_control}>
                              <div className={style.css_3ks0yi}>
                                <div className={style.css_9c3af7} data-value="">
                                  <input
                                    className=""
                                    autocapitalize="none"
                                    autocomplete="off"
                                    autocorrect="off"
                                    id="react-select-4-input"
                                    spellcheck="false"
                                    tabIndex="0"
                                    type="text"
                                    aria-autocomplete="list"
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                    aria-controls="react-select-4-listbox"
                                    aria-owns="react-select-4-listbox"
                                    role="combobox"
                                    aria-describedby="react-select-4-placeholder"
                                    value=""
                                    style={{
                                      color: 'inherit',
                                      background: '0px center',
                                      opacity: '1',
                                      width: '100%',
                                      gridArea: '1 / 2 / auto / auto',
                                      font: 'inherit',
                                      minWidth: '2px',
                                      border: '0px',
                                      margin: '0px',
                                      outline: '0px',
                                      padding: '0px',
                                    }}
                                  />
                                </div>
                                <div className={style.css_1nyd9vq_placeholder}>+ Add Tag</div>
                              </div>
                              <div className={style.css_1wy0on6}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
                // }

                indexHolder = i;
              })}
            {loader == true && indexHolder != loop_end_index ? (
              <div
                style={{ paddingLeft: '500px', paddingRight: '500px' }}
                className="font-icon-wrapper float-left mr-3 mb-3"
              >
                <div className="loader-wrapper d-flex justify-content-center align-items-center">
                  <Loader type="ball-scale-ripple-multiple" />
                </div>
                <p style={{ color: 'black', fontWeight: '600' }}>Review(s) loading</p>
              </div>
            ) : (
              <></>
            )}
          </div>
        </Col>
        {/* <Col md="3">
                    <div className={style.application__filter__rc_menu}>
                        <div className={style.application__filter__header}>
                            <h1 className={cx(style.bHeading, style.b_heading__h1)}>
                                Filters
                            </h1>
                            <button type="button" className={cx(style.b_button, style.b_button__clean)}>
                                <svg width="16" height="16" viewBox="0 0 16 16" className={cx(style.iIcon, style.i_icon__grey)}>
                                    <path d="M7.293 8L2.1 13.192a.5.5 0 00.707.707L8 8.707l5.192 5.192a.5.5 0 10.707-.707L8.707 8 13.9 2.808a.5.5 0 10-.707-.707L8 7.293 2.808 2.1a.5.5 0 10-.707.707L7.293 8z"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="application_filter_body">
                            <FormGroup>
                                <Label for="sources">Sources</Label>
                                <Select 
                                    id="sources"
                                    options={source_list} 
                                    filterOption={customFilter}
                                    // menuIsOpen = {true}
                                    onChange = {(e)=>onSourceChange(e)}
                                    styles = {optionStyles}
                                    isMulti={true}
                                    components = {{ MultiValue }}
                                />
                            </FormGroup>
                            <FormGroup style={{width:"100%"}}>
                                <Label for="dateRange">Date Range</Label>
                                <DatePicker
                                    id="dateRange"
                                    format="DD/MM/YYYY"
                                    render={(value, openCalendar) => {
                                            return (
                                                <Input style={{fontSize:"12px", width:"100%"}} value={value} onClick={openCalendar} type="text"></Input>
                                            )
                                        }
                                    }
                                    calendarPosition="left-end or left-bottom"
                                    value={date_range_value}
                                    onChange={setValue}
                                    range
                                    numberOfMonths={2}
                                    style={{width:"100%"}}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="keyword">Keywords</Label>
                                <Input id="keyword" type="text" name="keyword" />
                            </FormGroup>
                            <FormGroup>
                                <Collapsible 
                                    openedClassName ={style.application__filter__label_opened} 
                                    className={style.application__filter__label} 
                                    trigger={<p> Stars<span style={{float:"right"}}>+</span></p>}
                                    triggerWhenOpen={<p> Stars<span style={{float:"right"}}>-</span></p>}
                                    transitionTime = "10"
                                >
                                    <FormGroup check>
                                        <Label check>
                                            <Input onClick={(e)=>onStarsSelection(e)} data-stars="5" checked = {stars_selected.includes(5)?true:false} type="checkbox" />{' '}
                                            <StarRatings
                                                rating={5}
                                                starRatedColor="rgb(243, 182, 54)"
                                                numberOfStars={5}
                                                name='rating'
                                                starDimension="18px"
                                                starSpacing="0px"
                                            />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input onClick={(e)=>onStarsSelection(e)} data-stars="4" checked = {stars_selected.includes(4)?true:false} type="checkbox" />{' '}
                                            <StarRatings
                                                rating={4}
                                                starRatedColor="rgb(243, 182, 54)"
                                                numberOfStars={5}
                                                name='rating'
                                                starDimension="18px"
                                                starSpacing="0px"
                                            />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input onClick={(e)=>onStarsSelection(e)} data-stars="3" checked = {stars_selected.includes(3)?true:false} type="checkbox" />{' '}
                                            <StarRatings
                                                rating={3}
                                                starRatedColor="rgb(243, 182, 54)"
                                                numberOfStars={5}
                                                name='rating'
                                                starDimension="18px"
                                                starSpacing="0px"
                                            />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input onClick={(e)=>onStarsSelection(e)} data-stars="2" checked = {stars_selected.includes(2)?true:false} type="checkbox" />{' '}
                                            <StarRatings
                                                rating={2}
                                                starRatedColor="rgb(243, 182, 54)"
                                                numberOfStars={5}
                                                name='rating'
                                                starDimension="18px"
                                                starSpacing="0px"
                                            />
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input onClick={(e)=>onStarsSelection(e)} data-stars="1" checked = {stars_selected.includes(1)?true:false} type="checkbox" />{' '}
                                            <StarRatings
                                                rating={1}
                                                starRatedColor="rgb(243, 182, 54)"
                                                numberOfStars={5}
                                                name='rating'
                                                starDimension="18px"
                                                starSpacing="0px"
                                            />
                                        </Label>
                                    </FormGroup>
                                </Collapsible>
                            </FormGroup>
                            <FormGroup>
                                <Collapsible 
                                    openedClassName ={style.application__filter__label_opened} 
                                    className={style.application__filter__label} 
                                    trigger={<p> Sentiment<span style={{float:"right"}}>+</span></p>}
                                    triggerWhenOpen={<p> Sentiment<span style={{float:"right"}}>-</span></p>}
                                    transitionTime = "10"
                                >
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" />{' '}
                                            <span style={{fontWeight:"600", color:"green"}}>Positive</span>
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" />{' '}
                                            <span style={{fontWeight:"600", color:"rgb(255, 158, 0)"}}>Neutral</span>
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" />{' '}
                                            <span style={{fontWeight:"600", color:"rgb(230, 64, 58)"}}>Negative</span>
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" />{' '}
                                            <span style={{fontWeight:"600", color:"rgb(114, 141, 163)"}}>Mixed</span>
                                        </Label>
                                    </FormGroup>
                                </Collapsible>
                            </FormGroup>
                            <FormGroup>
                                <Select
                                    placeholder="Select Version"
                                    options = {options}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Select
                                    placeholder="Select Tags & Topics"
                                    options = {options}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Button variant="dark" style={{width:"100%"}} onClick={()=>getReviews()}>Get Reviews</Button>
                            </FormGroup>
                        </div>
                    </div>

                </Col> */}
      </Row>
    </Fragment>
  );
};

export default Reviews;
