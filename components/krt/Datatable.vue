<template>
  <div class="flex flex-col w-full">
    <span>{{ tableTitle }}</span>
    <div class="flex justify-between w-full mx-auto mb-2">
      <div class="flex">
        <span class="my-auto mr-2">Search:</span>
        <krt-input
          v-model="query.search"
          :wait="400"
        />
      </div>
      <div class="my-auto">
        <krt-button
          text="Tambah Data"
          @on-click="handleAdd"
        />
      </div>
    </div>
    <table class="w-11/12 mx-auto lg:w-full">
      <thead>
        <tr class="border-b-4 border-main-dark text-lg bg-gray-300 text-center rounded-tr-md">
          <th
            v-for="(column, index) in columns"
            :key="index"
            class="py-1 border-r last:border-none border-main-dark"
          >
            {{ column['name'] }}
          </th>
          <th v-if="isAction" class="w-1/12">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="options.length">
          <tr
            v-for="(item, index) in options"
            :key="index"
            class="border-b hover:bg-main hover:text-white"
          >
            <td
              v-for="(column, idx) in columns"
              :key="idx"
              class="py-2 px-3 border-main-dark"
              :class="column.tdClass ? column.tdClass : ''"
            >
              {{ item[column['key']] }}
            </td>
            <td v-if="isAction" class="flex items-center justify-center gap-x-4 py-1 px-3 border-main-dark">
              <krt-button
                variant="warning"
                text="Edit"
                size="small"
                @on-click="handleEdit(item)"
              />
              <krt-button
                v-if="isDelete"
                variant="danger"
                :text="deleteText"
                size="small"
                @on-click="handleDelete(item)"
              />
            </td>
          </tr>
        </template>
        <tr v-else>
          <td :colspan="columns.length + 1" class="text-xl text-center p-3">
            Empty Data
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import KrtButton from '~/components/krt/Button'
import KrtInput from '~/components/krt/Input'
import common from '~/mixin/common'
export default {
  name: 'KrtDatatable',
  components: { KrtInput, KrtButton },
  mixins: [common],
  props: {
    tableTitle: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    deleteText: {
      type: String,
      default: 'Delete'
    },
    isAction: {
      type: Boolean,
      default: true
    },
    isDelete: {
      type: Boolean,
      default: true
    },
    query: {
      type: Object,
      required: true
    }
  },
  watch: {
    query: {
      deep: true,
      handler () {
        this.$emit('data-changed', this.query)
      }
    }
  },
  methods: {
    handleEdit (payload) {
      this.$emit('on-edit', payload)
    },
    handleDelete (payload) {
      this.$emit('on-delete', payload)
    },
    handleAdd () {
      this.$emit('on-add-data')
    }
  }
}
</script>
