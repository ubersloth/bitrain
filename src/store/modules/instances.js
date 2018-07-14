import { GET_INSTANCES } from '@/store/actions.type'
import { RECEIVE_INSTANCES } from '@/store/mutations.type'
import { AwsWrapperService } from '@/api/api.service'
import { capitalize, sortingFunctions } from '@/shared/tools'
import { fields } from '@/shared/trading'

const state = {
  instances: [],
  loaded: false
}

const actions = {
  [GET_INSTANCES] ({ commit }) {
    AwsWrapperService.get().then(response => {
      if (response && response.data) {
        commit(RECEIVE_INSTANCES, response.data)
      }
    })
  }
}

const mutations = {
  [RECEIVE_INSTANCES] (state, instances) {
    state.instances = instances
    state.loaded = true
  }
}

const getters = {
  instancesList: function (state, getters, rootState) {
    let instances = state.instances

    if (rootState && rootState.authentication && rootState.authentication.user === 'demo') {
      console.log('Demo mode, mocking additional instances')
      instances = [...state.instances]
      instances.push(...instances)
      instances.push(...instances)
      instances.push(...instances)
    }

    return instances.map(inst => {
      return {
        [fields.id]: inst.InstanceId || '',
        [fields.name]: (inst.Tags || []).filter(t => t.Key === 'Name').map(t => t.Value)[0] || '',
        [fields.type]: inst.InstanceType || '',
        [fields.state]: capitalize((inst.State || {}).Name || ''),
        [fields.az]: (inst.Placement || {}).AvailabilityZone || '',
        [fields.publicip]: inst.PublicIpAddress || '',
        [fields.privateips]: (inst.NetworkInterfaces || []).reduce((ips, ni) =>
          ips.concat((ni.PrivateIpAddresses || []).map(ip => ip.PrivateIpAddress)),
        []).sort(sortingFunctions.ip).join(', ')
      }
    })
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
