import * as types from '../mutation-types'
import {location} from '@/api/location'

const state = {
  lat: '', // 当前位置纬度
  lng: '', // 当前位置经度
  address: {
    address: '定位中...',
    lat: '',
    lng: '',
  },
  locationReady: false,   //定位是否完成
  deliveryAddress: {} // 定位成功，拉取的商店数据
};

const getters = {
  // 这里并没有过滤，只是为了规范vuex，与直接从state中取一样
  address: state => state.address,
  locationReady: state => state.locationReady,
  deliveryAddress: state => state.deliveryAddress
};

const actions = {
  // 清空地址，{commit}是解构，相当于state.commit
  clearAddress({commit}) {
    commit(types.CLEAR_ADDRESS);
  },
  // 异步获取定位
  location({commit}) {
    // location是在api文件的方法，返回一个Promise对象，异步获取定位
    location().then((response) => {
      if (response.data.status === 200) {
        let data = response.data.data;
        commit(types.RECORD_ADDRESS, {address: data.address, ...data.location}); //保存title 和 经纬度到VUEX中
        commit(types.LOCATION_READY, true);    //定位完成 拉取商店
      }else {
        commit(types.LOCATION_READY, false);    //定位失败
        commit(types.FAIL_LOCATION);
      }
    })  
  },
  recordAddress({commit}, address) {
    commit(types.RECORD_ADDRESS, address); //保存title 和 经纬度到VUEX中
    commit(types.LOCATION_READY, true);    //定位完成 拉取商店
  },
  locationReady({commit}, boolean) {
    commit(types.LOCATION_READY, boolean);    //定位完成 拉取商店
  },
  recodeDeliveryAddress({commit}, address) {
    commit(types.RECORD_DELIVERY_ADDRESS, address);    //定位完成 拉取商店
  },
  failLocation({commit}) {      //定位失败
    commit(types.FAIL_LOCATION);
  }
};

const mutations = {
  // 清空adress值
  [types.CLEAR_ADDRESS](state) {
    let address = {address: '定位中...', lat: '', lng: ''};
    state.address = {...address};
  },
  // 改变地址值
  [types.RECORD_ADDRESS](state, address) {
    state.address = {...address}
  },
  //定位完成拉取附近餐馆，改变定位完成的值
  [types.LOCATION_READY](state, boolean) {
    state.locationReady = boolean;
  },
  [types.RECORD_DELIVERY_ADDRESS](state, address) {
    state.deliveryAddress = {...address};
  },
  [types.FAIL_LOCATION](state) {
    let address = {address: '定位失败...', lat: '', lng: ''}
    state.address = {...address};
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
