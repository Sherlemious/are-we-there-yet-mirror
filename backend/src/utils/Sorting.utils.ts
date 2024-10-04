export async function getOrderBy(sortBy: string | undefined): Promise<Array<[String, String]>> {
  try {
    const orderBy: Array<[String, String]> = [['timestamp', 'DESC']];

    if (!sortBy) {
      return orderBy;
    }

    const parts = sortBy.split('-');

    if (![parts[0], parts[1]].includes('ASC') && ![parts[0], parts[1]].includes('DESC')) {
      return orderBy;
    }


    return [[parts[0], parts[1].toLowerCase()]];
  } catch (e) {
    console.error(e);
    return [['_id', 'DESC']];
  }
}
