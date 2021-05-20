<template>
  <div class="container mx-auto">
    <p class="text-center text-5xl font-semibold mb-4">
      User Page
    </p>
    <p v-if="isLoading" class="text-lg animate-pulse">
      Loading Data
    </p>
    <template v-else>
      <krt-datatable
        :options="usersMap"
        :columns="columns"
        :is-delete="false"
        @on-edit="handleEdit"
      />
    </template>
  </div>
</template>

<script>
import KrtDatatable from '~/components/krt/Datatable'
import common from '~/mixin/common'
export default {
  name: 'AdminGoods',
  components: { KrtDatatable },
  mixins: [common],
  data () {
    return {
      isLoading: false,
      columns: [
        {
          key: 'id',
          name: 'ID'
        },
        {
          key: 'name',
          name: 'Name'
        },
        {
          key: 'email',
          name: 'Email'
        },
        {
          key: 'company',
          name: 'Company'
        },
        {
          key: 'blocked',
          name: 'isBlocked'
        }
      ]
    }
  },
  head: {
    title: 'Admin | User'
  },
  computed: {
    users () {
      return this.$store.state.api.profile.profiles
    },
    usersMap () {
      return this.users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          company: user.profile.company ? user.profile.company : '-',
          blocked: user.level_id > 8 ? 'blocked' : 'not blocked'
        }
      })
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      await this.$store.dispatch('api/profile/getProfiles')
    },
    handleEdit (payload) {
      this.$router.push({ name: 'admin-add-user-detail', params: { id: payload.id } })
    }
  }
}
</script>
