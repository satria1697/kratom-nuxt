<template>
  <div class="flex flex-col w-full">
    <span>{{ tableTitle }}</span>
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
              @onClick="handleEdit(item)"
            />
            <krt-button
              variant="danger"
              :text="deleteText"
              size="small"
              @onClick="handleDelete(item)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import KrtButton from '~/components/krt/Button'
export default {
  name: 'KrtDatatable',
  components: { KrtButton },
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
    }
  },
  methods: {
    handleEdit (payload) {
      this.$emit('on-edit', payload)
    },
    handleDelete (payload) {
      this.$emit('on-delete', payload)
    }
  }
}
</script>
