import module from '@/store/modules/instances'

let state

beforeEach(() => {
  state = {
    instances: [{}]
  }
})

describe('instancesList getter', () => {
  it('Extracts name from tag', ()=> {
    state.instances[0].Tags = [{ Key: 'Name', Value: 'DB' }]
    expect(module.getters.instancesList(state)[0].name).toBe('DB')
  })

  it('Extracts empty name from missing tag', ()=> {
    state.instances[0].Tags = []
    expect(module.getters.instancesList(state)[0].name).toBe('')
  })

  it('Extracts id from InstanceId', ()=> {
    state.instances[0].InstanceId = '123'
    expect(module.getters.instancesList(state)[0].id).toBe('123')
  })

  it('Extracts state from State', ()=> {
    state.instances[0].State = { Name: 'Stopped' }
    expect(module.getters.instancesList(state)[0].state).toBe('Stopped')
  })

  it('Capitalizes state', ()=> {
    state.instances[0].State = { Name: 'stopped' }
    expect(module.getters.instancesList(state)[0].state).toBe('Stopped')
  })

  it('Extracts empty state from missing State', ()=> {
    expect(module.getters.instancesList(state)[0].state).toBe('')
  })

  it('Extracts availability zone from Placement', ()=> {
    state.instances[0].Placement = { AvailabilityZone: 'east' }
    expect(module.getters.instancesList(state)[0].az).toBe('east')
  })

  it('Extracts empty availability zone from missing Placement', ()=> {
    expect(module.getters.instancesList(state)[0].az).toBe('')
  })

  it('Extracts public ip from missing PublicIpAddress', ()=> {
    state.instances[0].PublicIpAddress = '1.1.1.1'
    expect(module.getters.instancesList(state)[0].publicip).toBe('1.1.1.1')
  })

  it('Extracts private ips from NetworkInterfaces', ()=> {
    state.instances[0].NetworkInterfaces = [
      { PrivateIpAddresses: [{ PrivateIpAddress: '1.1.1.1' }, { PrivateIpAddress: '2.2.2.2' }] },
      { PrivateIpAddresses: [{ PrivateIpAddress: '4.4.4.4' }] }
    ]
    expect(module.getters.instancesList(state)[0].privateips).toBe('1.1.1.1, 2.2.2.2, 4.4.4.4')
  })

  it('Extracts empty private ips missing NetworkInterfaces', ()=> {
    expect(module.getters.instancesList(state)[0].privateips).toBe('')
  })  
})