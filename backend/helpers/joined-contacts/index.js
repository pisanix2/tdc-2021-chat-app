const fn = async ({ db, id_origin, id_destination }) => {
  const joinned = await db.sequelize.query(`
      select id
      from (
        select id from public.tdc_contact_joined tcj where tcj.id_contact_origin = '${id_origin}' and tcj.id_contact_destination = '${id_destination}'
        union all
        select id from public.tdc_contact_joined tcj where tcj.id_contact_destination = '${id_origin}' and tcj.id_contact_origin = '${id_destination}'
      ) as joined
      limit 1;
      `)
  if (joinned && joinned.length && joinned[0] && joinned[0].length) {
    return joinned[0][0].id
  } else {
    return null
  }
}

module.exports = fn
