<template>
  <div class="flex flex-col w-full">
    <span>{{ tableTitle }}</span>
    <table class="w-11/12 mx-auto lg:w-full text-center">
      <thead>
        <tr class="border-b-2 text-lg">
          <th v-for="(column, index) in columns" :key="index">
            {{ column['name'] }}
          </th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in options"
          :key="index"
          class="border-b hover:bg-main hover:text-white cursor-pointer"
        >
          <td v-for="(column, idx) in columns" :key="idx" class="py-2">
            {{ item[column['key']] }}
          </td>
          <td class="flex items-center justify-center gap-x-4 py-1">
            <krt-button
              variant="warning"
              text="Edit"
              size="small"
              @onClick="handleEdit(item)"
            />
            <krt-button
              variant="danger"
              text="Delete"
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
