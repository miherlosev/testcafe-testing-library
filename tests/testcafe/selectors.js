/* eslint-disable import/named */
import {Selector} from 'testcafe'
import {
  getByText,
  getByPlaceholderText,
  getByLabelText,
  getByAltText,
  getByTestId,
  getAllByText,
  queryByText,
  addTestcafeTestingLibrary,
} from '../../src/'

fixture`selectors`.beforeEach(addTestcafeTestingLibrary)
  .page`http://localhost:13370`

test('getByPlaceHolderText', async t => {
  await t
    // .wait(500000)
    .typeText(getByPlaceholderText('Placeholder Text'), 'Hello Placeholder')
})
test('getByText', async t => {
  await t.click(getByText('getByText'))
})

test('getByLabelText', async t => {
  await t.typeText(
    getByLabelText('Label For Input Labelled By Id'),
    'Hello Input Labelled By Id',
  )
})

test('getByAltText', async t => {
  await t.click(getByAltText('Image Alt Text'))
})

test('getByTestId', async t => {
  await t.click(getByTestId('image-with-random-alt-tag'))
})

test('getAllByText', async t => {
  const chans = getAllByText(/^Jackie Chan/)
  const {count} = await chans

  for (let i = 0; i < count; i++) {
    await t.click(chans.nth(i))
  }
})

test('queryByText', async t => {
  await t.expect(queryByText('Button Text').exists).ok()
  await t.expect(queryByText('Non-existing Button Text').exists).notOk()
})

test.skip('getByText in container', async t => {
  const nested = await Selector('#nested')
  await t.click(getByText('Button Text', {container: nested}))
})

test.skip('getByTestId only throws the error message', async t => {
  const testId = 'Some random id'
  const errorMessage = `Unable to find an element by: [data-testid="${testId}"]`
  try {
    await t.click(getByText(testId))
  } catch (e) {
    await t.expect(e).contains(errorMessage)
  }
})
