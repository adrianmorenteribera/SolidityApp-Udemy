import React from "react";
import Layout from "../../../components/Layout";
import { Button, Table, Header } from "semantic-ui-react";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

const Index = ({ address, requestCount, request, approversCount }) => {
  const { Header, Row, HeaderCell, Body } = Table;

  const renderRow = () => {
    if (requestCount > 0) {
      // Not sure about this behaviour
      //   console.log(request);
      return request.map((request, index) => {
        return (
          <RequestRow
            key={index}
            id={index}
            address={address}
            request={request}
            approversCount={approversCount}
          />
        );
      });
    }
  };

  return (
    <Layout>
      <h3> Requests list</h3>
      <Link route={`/campaigns/${address}/requests/new`}>
        <a>
          <Button floated="right" style={{ marginBottom: "1rem" }} primary>
            {" "}
            Add Request{" "}
          </Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>{renderRow()}</Body>
      </Table>
      <div> Found {requestCount} requests.</div>
    </Layout>
  );
};

Index.getInitialProps = async (props) => {
  const address = props.query.address;
  const campaign = Campaign(address);
  let requestCount = await campaign.methods.getRequestsCount().call();
  requestCount = parseInt(requestCount);

  const request = await Promise.all(
    Array(requestCount)
      .fill()
      .map((element, index) => {
        return campaign.methods.requests(index).call();
      })
  );

  console.log(request);
  const approversCount = await campaign.methods.approversCount().call();

  return { address, requestCount, request, approversCount };
};

export default Index;
