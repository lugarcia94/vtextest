// Import Componete CSS
import './components';
// import 'Core';

// import React from 'react';
// import ReactDOM from 'react-dom';

// import { Provider } from 'react-redux';
// import configureStore from './react/store/configureStore';

// import Menu from './react/components/Menu';
// const store = configureStore();
// import getProductById from 'Core/getProductById';

// import axios from 'axios';

// import 'Core/polyfill/hasAttribute';

// //Polyfill
// import 'Core/polyfill/array.range';
// import 'Core/polyfill/reduce';

// import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
// import CountDown from './react/components/Countdown';

// const config = {
//     menu: true,
//     minicart: true,
//     buybutton: true,
//     giftlist: false,
//     contact: true,
//     relatedSearch: true,
//     wishlist: true
// };

// // Load Order Form

// // store.dispatch(fetchOrderForm());


// CountDown();

// import ReduxToastr from 'react-redux-toastr';
// const rootToastr = document.querySelector('[data-component=toastr]');
// if (rootToastr)
//     ReactDOM.render(
//         <Provider store={store}>
//             <ReduxToastr
//                 timeOut={5000}
//                 newestOnTop={false}
//                 preventDuplicates
//                 position="top-right"
//                 transitionIn="fadeIn"
//                 transitionOut="fadeOut"
//                 progressBar
//                 closeOnToastrClick />
//         </Provider>,
//         rootToastr
//     );


// import Wholesale from './react/components/Wholesale';
// if (window.skuJson) {
//     initWholesales();
// }

// async function initWholesales() {
//     const current = await vtexjs.catalog.getCurrentProductWithVariations();
//     const product = await getProductById(current.productId);
//     const body = document.querySelector('body');
//     if (product['Atacado']) {
//         if (product['Atacado'] == 'Ativo') {
//             const rootWholesales = Array.from(document.querySelectorAll('[data-component=wholesale]'));

//             if (rootWholesales.length) {
//                 body.classList.add('wholesale-page');
//                 rootWholesales.forEach((rootWholesale) => {
//                     ReactDOM.render(
//                         <Provider store={store}>
//                             <Wholesale product={product} sc={current.salesChannel} />
//                         </Provider>,
//                         rootWholesale
//                     );
//                 })
//             } else body.classList.add('not-wholesale');
//         } else body.classList.add('not-wholesale');
//     } else body.classList.add('not-wholesale');

// }

// import WholesalePrices from './react/components/Wholesale/wholesalePrice';
// let rootWholesalePrices = Array.from(document.querySelectorAll('[data-component=wholesale-prices]'));
// if (rootWholesalePrices.length) {
//     rootWholesalePrices.forEach((rootWholesalePrice) => {
//         ReactDOM.render(
//             <Provider store={store}>
//                 <WholesalePrices />
//             </Provider>,
//             rootWholesalePrice
//         );
//     })
// }


// import Kit from './react/components/kit';
// let rootKit = Array.from(document.querySelectorAll('[data-component=kits]'));

// if (rootKit.length) {

//     rootKit.forEach((kit) => {
//         let title = kit.querySelector('h2') ? kit.querySelector('h2').innerHTML : '';
//         let rate = [];
//         let ids = [];

//         Array.from(kit.querySelectorAll('[data-id]')).forEach(id => {
//             ids.push(id.getAttribute('data-id'));
//             rate.push(id.querySelector('.rate').innerHTML);
//         });

//         ReactDOM.render(
//             <Provider store={store}>
//                 <Kit ids={ids} rate={rate} title={title} />
//             </Provider>,
//             kit
//         );
//     });
// }


// // Render Button Menu
// // import ButtonMenu from './react/components/ButtonMenu';
// if (config.menu) {
//     let rootMenu = document.querySelector('#menu');

//     if (rootMenu) {
//         let slotMenu = Array.from(rootMenu.querySelectorAll('[slot]'));

//         // Render Menu
//         ReactDOM.render(
//             <Provider store={store}>
//                 <Menu slot={slotMenu} />
//             </Provider>,
//             rootMenu
//         );
//     }

//     // let rootButtonMenu = document.querySelector('.header__button-menu');
//     //
//     // if(rootButtonMenu) {
//     //     ReactDOM.render(
//     //         <Provider store={store}>
//     //             <ButtonMenu />
//     //         </Provider>,
//     //         rootButtonMenu
//     //     );
//     // }
// }


// // Minicart
// import Minicart from './react/components/Minicart';

// if (config.minicart) {
//     let rootMinicart = document.querySelector('#minicart');
//     if (rootMinicart) {
//         let valorFrete = 0;
//         if (document.querySelector('#valorFreteGratis'))
//             valorFrete = document.querySelector('#valorFreteGratis').innerHTML;
//         ReactDOM.render(
//             <Provider store={store}>
//                 <Minicart frete={valorFrete} />
//             </Provider>,
//             rootMinicart
//         );
//     }
// }


// function addBuyButton() {
//     let rootBuyButtom = document.querySelectorAll('.showcase__buy:not(.on)');

//     Array.from(rootBuyButtom).forEach(function (root) {
//         let id = root.getAttribute('data-id');
//         let title = root.innerHTML;
//         root.classList.add('on');

//         ReactDOM.render(
//             <Provider store={store}>
//                 <BuyButton id={id} title={title} />
//             </Provider>,
//             root
//         );

//     });
// }

// import BuyButton from './react/components/BuyButton';
// if (config.buybutton) {
//     addBuyButton();
// }

// $vtex(document).ajaxComplete(function (evt, xhref, settings) {
//     if (config.buybutton) {
//         addBuyButton();
//     }
//     if (settings.url.indexOf('buscapagina') !== -1) {
//         CountDown();
//     }
// });
// //
// // // Gift List
// // import GiftList from './react/components/GiftList';
// // if(config.giftlist) {
// //
// //     let rootGiftList = document.querySelectorAll('.showcase__giftlist');
// //
// //     Array.from(rootGiftList).forEach(function(root) {
// //         let id = root.getAttribute('data-id');
// //
// //         ReactDOM.render(
// //             <Provider store={store}>
// //                 <GiftList id={id} />
// //             </Provider>,
// //             root
// //         );
// //
// //     });
// // }
// //
// // Contato
// import Contact from './react/components/Contact';

// if (config.contact) {
//     let rootContact = document.querySelector('[data-component=contact]');

//     if (rootContact) {
//         ReactDOM.render(
//             <Provider store={store}>
//                 <Contact />
//             </Provider>,
//             rootContact
//         );
//     }

// }
// //
// // //Related Search
// // import RelatedSearch from './react/components/RelatedSearch';
// //
// // if(config.relatedSearch) {
// //     let rootRelatedSearch = document.querySelector('#related-search');
// //
// //     if(rootRelatedSearch) {
// //         window.addEventListener('auaha.product', e => {
// //             let id = e.detail.product.productId;
// //
// //             ReactDOM.render(
// //                 <Provider store={store}>
// //                     <RelatedSearch id={id} />
// //                 </Provider>,
// //                 rootRelatedSearch
// //             );
// //         });
// //     }
// // }

// import WishList from './react/components/WishList';
// if (config.wishlist) {
//     WishList();
// }


// /**
//  * Function Flag Redirect
//  */

// (() => {
//     const flags = document.querySelectorAll('.labels--collection .flag');

//     function redirectFlag(flags, label) {
//         const id = Object.keys(flags).filter((key) => flags[key] === label)[0];
//         location.href = `/${id}?map=productClusterSearchableIds`;
//     }

//     flags.forEach((flag) => {
//         flag.addEventListener('click', (evt) => {
//             const _this = evt.currentTarget;
//             const skuID = _this.closest('.showcase__item').getAttribute('data-sku');
//             const label = _this.innerHTML;

//             axios.get(`/api/catalog_system/pub/products/search?fq=skuId:${skuID}`)
//                 .then((data) => data.data)
//                 .then((data) => data[0].clusterHighlights)
//                 .then((flags) => redirectFlag(flags, label));
//         });
//     });
// })();

