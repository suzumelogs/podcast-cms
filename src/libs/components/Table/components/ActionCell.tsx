import { base } from '@/libs/config/theme'
import InfoIcon from '@mui/icons-material/Info'
import PanToolAltIcon from '@mui/icons-material/PanToolAlt'
import { IconButton, Stack } from '@mui/material'
import { RowData } from '@tanstack/react-table'
import { usePathname, useRouter } from 'next/navigation'
import { ActionConfig, ReactTableCellProps } from '../ReactTable/types'
import { ButtonAction } from '../styled'

function ActionCell<T extends RowData, TValue = unknown>({
  row,
  table,
}: ReactTableCellProps<T, TValue>): JSX.Element {
  const router = useRouter()
  const meta = table.options.meta
  const pathname = usePathname()
  const actionConfig = meta?.action as ActionConfig<T>
  const _id = (row.original as { _id: never })._id

  const detailConfig = actionConfig.onDetail
  const hasDetailConfig = detailConfig && typeof detailConfig === 'function'
  const hasDetail = !actionConfig.disabledDetail

  const onDetail = () => {
    if (hasDetailConfig) {
      detailConfig(_id as string, row)
    } else {
      router.push(`${pathname}/${_id}/detail`)
    }
  }

  const onSetTop = () => {
    // Implement the logic to set the item to the top
    console.log('Setting item to top:', _id)
  }

  return (
    <Stack direction="row" justifyContent="center">
      {actionConfig.renderLeft && actionConfig.renderLeft(row)}

      {actionConfig.onSetTop && (
        <ButtonAction onClick={onSetTop}>
          {actionConfig.setTopIcon || (
            <IconButton>
              <PanToolAltIcon style={{ fill: base.primary }} fontSize="small" />
            </IconButton>
          )}
        </ButtonAction>
      )}

      {hasDetail && (
        <ButtonAction onClick={onDetail}>
          {actionConfig.detailIcon || (
            <IconButton>
              <InfoIcon style={{ fill: base.primary }} fontSize="small" />
            </IconButton>
          )}
        </ButtonAction>
      )}

      {actionConfig.renderRight && actionConfig.renderRight(row)}
    </Stack>
  )
}

export { ActionCell }
